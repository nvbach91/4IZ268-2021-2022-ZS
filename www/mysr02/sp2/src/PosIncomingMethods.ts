import * as z from 'zod';

type PosOutgoingMethod<TArgs, TResult> = (result: TResult, args: TArgs, uuid: string) => Promise<any>;

interface PosIncomingMethodsMethod<TArgs, TResult, TDecode = void extends TResult ? undefined : PosOutgoingMethod<TArgs, TResult>> {
	decode: (args: Array<unknown>, uuid: string | null) => Promise<MethodCallRequestOpts<TArgs>>;
	encode: TDecode;
}

const errorArgs = z.object({
	error: z.object({
		code: z.string(),
		message: z.string(),
	}),
});

const getBillArgs = z.object({
	idBill: z.string(),
	userId: z.string().nullable(),
});

const searchBillSchema = z.object({
	qrIdentifier: z.string(),
	userId: z.string().nullable(),
});

const getTableContentsSchema = z.object({
	cIdTable: z.string(),
	userId: z.string().nullable(),
});

const pairCustomerSchema = z.object({
	ident: z.string(),
	userId: z.string(),
});

const paymentSchema = z.object({
	additionalData: z.object({}).nonstrict(),
	currency: z.string(),
	discount: z.object({
		additionalData: z.object({}).nonstrict().nullable(),
		name: z.string(),
		source: z.string(),
		value: z.string(),
		provider: z.string(),
	}),
	id: z.string(),
	idBill: z.string(),
	idCustomer: z.string(),
	items: z.array(
		z.object({
			additionalData: z.object({}).nonstrict().nullable(),
			id: z.string(),
			minQuantity: z.string(),
			name: z.string(),
			price: z.string(),
			quantity: z.string(),
			tags: z.array(z.string()),
		})
	),
	state: z.string(),
	parts: z.array(
		z.object({
			provider: z.object({
				id: z.string(),
				name: z.string(),
				type: z.string(),
			}),
			total: z.string(),
		}),
	),
	tipBrutto: z.string(),
	tipNetto: z.string(),
	timestamp: z.string(),
});

const paymentStartSchema = z.object({
	payment: paymentSchema,
});

const paymentProcessedSchema = z.object({
	paymentId: z.string(),
});

const paymentClosedSchema = z.object({
	paymentId: z.string(),
	state: z.string(),
});

const getOrderByIdSchema = z.object({
	idOrder: z.string(),
});

export interface PosIncomingMethods {

	error: PosIncomingMethodsMethod<z.infer<typeof errorArgs>, void>;

	getBill: PosIncomingMethodsMethod<z.infer<typeof getBillArgs>, Record<string, unknown>>;
	searchBills: PosIncomingMethodsMethod<z.infer<typeof searchBillSchema>, Record<string, unknown>>;
	getTableContents: PosIncomingMethodsMethod<z.infer<typeof getTableContentsSchema>, Record<string, unknown>>;
	getTableList: PosIncomingMethodsMethod<any, Record<string, unknown>>;
	pairCustomer: PosIncomingMethodsMethod<z.infer<typeof pairCustomerSchema>, Record<string, unknown>>;
	paymentStart: PosIncomingMethodsMethod<z.infer<typeof paymentStartSchema>, Record<string, unknown>>;
	paymentProcessed: PosIncomingMethodsMethod<z.infer<typeof paymentProcessedSchema>, Record<string, unknown>>;
	paymentClosed: PosIncomingMethodsMethod<z.infer<typeof paymentClosedSchema>, void>;
	getOrderById: PosIncomingMethodsMethod<z.infer<typeof getOrderByIdSchema>, Record<string, unknown>>;

	// getMealMenus: PosIncomingMethodsMethod<MealMenusRequest, Record<string, unknown>>;
	// orderPrepare: PosIncomingMethodsMethod<OrderPrepareRequest, Record<string, unknown>>;
	// orderStart: PosIncomingMethodsMethod<OrderStartRequest, Record<string, unknown>>;
	// orderMarkAsPaid: PosIncomingMethodsMethod<OrderMarkAsPaidRequest, Record<string, unknown>>;
	// orderClose: PosIncomingMethodsMethod<OrderCloseRequest, Record<string, unknown>>;
	// orderStatus: PosIncomingMethodsMethod<OrderStatusRequest, Record<string, unknown>>;

	// getResource: PosIncomingMethodsMethod<GetPosResourceRequest, Record<string, unknown>>;

	// startIndividualBill: PosIncomingMethodsMethod<StartIndividualBillRequest, Record<string, unknown>>;
	// cancelIndividualBill: PosIncomingMethodsMethod<CancelIndividualBillRequest, void>;
	// updateIndividualBill: PosIncomingMethodsMethod<UpdateIndividualBillRequest, Record<string, unknown>>;
	// authorizeLoyaltyCard: PosIncomingMethodsMethod<PosCardAuthorizationRequest, Record<string, unknown>>;
}

export interface MethodCallRequestOpts<TArgs> {
	uuid: string | null;
	method: keyof PosIncomingMethods;
	args: TArgs;
}

export const methodCallRequestSchema = z.object({
	uuid: z.string().nullable(),
	method: z.string(),
	args: z.unknown(),
});

export class PosIncomingMethodsV2 implements PosIncomingMethods {

	private createResult = <TResult, TArgs>(tr: (x: Record<string, unknown>, args: TArgs) => TResult | Promise<TResult>) => async (result: Record<string, unknown>, args: TArgs, uuid: string): Promise<{
		result: TResult;
		uuid: string;
		type: string;
	}> => {
		return ({
			result: await tr(result, args),
			uuid,
			type: 'method-call-response',
		});
	};

	protected createRequest = <TArgs>(method: string, uuid: string | null, args: unknown, encodedArgs: TArgs): MethodCallRequestOpts<TArgs> => {
		return {
			uuid,
			method,
			args: encodedArgs,
		};
	};

	protected overrideMethodName(name: string, parentFunction: PosIncomingMethodsMethod<any, any>): PosIncomingMethodsMethod<any, any> {
		return ({
			decode: async (encodeArgs, encodestring: string | null) => ({ ...(await parentFunction.decode(encodeArgs, encodestring)), method: name }),
			encode: 'encode' in parentFunction ? parentFunction.encode : undefined,
		});
	}

	protected createMethod<TArgs, TResult>(args: {
		method: string;
		decode: (args: unknown[]) => Promise<TArgs>;
		encode: (result: Record<string, unknown>, args: TArgs) => Promise<TResult>;
	}) {
		return ({
			decode: async (decodeArgs: unknown[], uuid: string | null) => this.createRequest(args.method, uuid, decodeArgs, await args.decode(decodeArgs)),
			encode: this.createResult(args.encode),
		});
	}

	protected createMethodWithoutResponse<TArgs>(args: {
		method: string;
		decode: (args: unknown[]) => Promise<TArgs>;
	}) {
		return ({
			decode: async (decodeArgs: unknown[]) => this.createRequest(args.method, null, decodeArgs, await args.decode(decodeArgs)),
			encode: undefined,
		});
	}

	public readonly error = this.createMethodWithoutResponse({
		method: 'error',
		decode: async ([ error ]) => errorArgs.parse({
			error,
		}),
	});

	public readonly getBill = this.createMethod({
		method: 'getBill',
		decode: async ([ billId, customerId ]) => getBillArgs.parse({
			idBill: billId,
			idCustomer: customerId,
		}),
		encode: async (result) => result,
	});

	public readonly searchBills = this.createMethod({
		method: 'searchBills',
		decode: async ([ qrCode, idCustomer ]) => searchBillSchema.parse({
			qrCode,
			idCustomer,
		}),
		encode: async (result) => result,
	});

	public readonly getTableContents = this.createMethod({
		method: 'getTableContents',
		decode: async ([ idTable, idCustomer ]) => getTableContentsSchema.parse({
			idTable,
			idCustomer,
		}),
		encode: async (result) => result,
	});

	public readonly getTableList = this.createMethod({
		method: 'getTableList',
		decode: async () => undefined,
		encode: async (result) => result,
	});

	public readonly pairCustomer = this.createMethod({
		method: 'pairCustomer',
		decode: async ([ ident, idCustomer ]) => pairCustomerSchema.parse({
			ident,
			idCustomer,
		}),
		encode: async () => undefined,
	});

	public readonly paymentClosed = this.createMethodWithoutResponse({
		method: 'paymentClosed',
		decode: async ([ idPayment, state ]) => paymentClosedSchema.parse({
			idPayment,
			state,
		}),
	});

	public readonly paymentStart = this.createMethod({
		method: 'paymentStart',
		decode: async ([ payment ]) => paymentStartSchema.parse({
			payment,
		}),
		encode: async () => undefined,
	});

	public readonly paymentProcessed = this.createMethod({
		method: 'paymentProcessed',
		decode: async ([ paymentId, state ]) => paymentProcessedSchema.parse({
			paymentId,
			state,
		}),
		encode: async (result) => result,
	});

	public readonly getOrderById = this.createMethod({
		method: 'getOrderById',
		decode: async ([ orderId ]) => getOrderByIdSchema.parse({ orderId }),
		encode: async (result) => result,
	});

	//
	// public readonly getMealMenus = this.createMethod({
	// 	method: 'getMealMenus',
	// 	decode: async (args: MealMenusRequest) => ({ args }),
	// 	encode: this.validateResponse(
	// 		posValidatorInst.isMealMenus(),
	// 	),
	// });
	//
	// public readonly orderPrepare = this.createMethod({
	// 	method: 'orderPrepare',
	// 	decode: async (args: OrderPrepareRequest) => ({ args }),
	// 	encode: this.validateResponse(
	// 		posValidatorInst.isOrderPrepare(),
	// 	),
	// });
	//
	// public readonly orderStart = this.createMethod({
	// 	method: 'orderStart',
	// 	decode: async (args: OrderStartRequest) => ({ args }),
	// 	encode: this.validateResponse(
	// 		posValidatorInst.isOrderStart(),
	// 		(result, req) => {
	// 			if (req?.orderDelivery?.deliveryType === 'toBill' && !result?.billId) {
	// 				throw new PosTypeError({ message: "billId is required for order with orderDelivery.toBill" });
	// 			}
	// 			return true;
	// 		},
	//
	// 	),
	// });
	//
	// public readonly orderMarkAsPaid = this.createMethod({
	// 	method: 'orderMarkAsPaid',
	// 	decode: async (args: OrderMarkAsPaidRequest) => ({ args }),
	// 	encode: this.validateResponse(posValidatorInst.isReceipt()),
	// });
	//
	// public readonly orderClose = this.createMethod({
	// 	method: 'orderClose',
	// 	decode: async (args: OrderCloseRequest) => ({ args }),
	// 	encode: async () => null,
	// });
	//
	// public readonly orderStatus = this.createMethod({
	// 	method: 'orderStatus',
	// 	decode: async (args: OrderStatusRequest) => ({ args }),
	// 	encode: this.validateResponse(posValidatorInst.isOrderStatus()),
	// });
	//
	// public readonly startIndividualBill = this.createMethod({
	// 	method: 'startIndividualBill',
	// 	decode: async (args: StartIndividualBillRequest) => ({ args }),
	// 	encode: async (result: unknown) => callCallbackAndTransformZodError(
	// 		result,
	// 		(result: unknown) => createStartIndividualBillResponse(startIndividualBillResponseDataValidator.parse(result)),
	// 	),
	// });
	//
	// public readonly cancelIndividualBill = this.createMethodWithoutResponse({
	// 	method: 'cancelIndividualBill',
	// 	decode: async (args: CancelIndividualBillRequest) => ({ args }),
	// });
	//
	// public readonly updateIndividualBill = this.createMethod({
	// 	method: 'updateIndividualBill',
	// 	decode: async (args: UpdateIndividualBillRequest) => ({ args }),
	// 	encode: async (result: unknown) => callCallbackAndTransformZodError(
	// 		result,
	// 		(result: unknown) => createUpdateIndividualBillResponse(updateIndividualBillResponseDataValidator.parse(result)),
	// 	),
	// });
	//
	// public readonly authorizeLoyaltyCard = this.createMethod({
	// 	method: 'authorizeLoyaltyCard',
	// 	decode: async (args: PosCardAuthorizationRequest) => ({ args }),
	// 	encode: async (result: unknown) => callCallbackAndTransformZodError(
	// 		result,
	// 		(result: unknown) => posCardAuthorizationResponseValidator.parse(result),
	// 	),
	// });
	//
	// public readonly getResource = this.createMethod({
	// 	method: 'getResource',
	// 	decode: async (args: GetPosResourceRequest) => ({ args }),
	// 	encode: async (result: unknown) => callCallbackAndTransformZodError(
	// 		result,
	// 		(result: unknown) => posResourceValidator.parse(result),
	// 	),
	// });

}
