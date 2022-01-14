import * as z from 'zod';

interface PosIncomingMethodsMethod<TArgs, TResult> {
	decode: (args: any) => Promise<MethodCallRequestOpts<TArgs>>;
	encode: (response: ResponseType, uuid: string) => Promise<MethodCallResponseOpts<TResult>>;
}

export type ResponseType = Record<string, unknown> | null | Record<string, unknown>[];

const errorArgs = z.object({
	error: z.object({
		code: z.string().nullable(),
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
	tableId: z.string(),
	userId: z.string().nullable(),
});

const pairCustomerSchema = z.object({
	ident: z.string(),
	userId: z.string(),
});

const paymentSchema = z.object({
	additionalData: z.object({}).nullable(),
	currency: z.string(),
	discount: z.object({
		additionalData: z.object({}).nullable(),
		name: z.string(),
		source: z.string(),
		value: z.string(),
		provider: z.string(),
	}).nullable(),
	id: z.string(),
	idBill: z.string(),
	idCustomer: z.string(),
	items: z.array(
		z.object({
			additionalData: z.object({}).nullable(),
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

	error: PosIncomingMethodsMethod<z.infer<typeof errorArgs>, null>;

	getBill: PosIncomingMethodsMethod<z.infer<typeof getBillArgs>, ResponseType>;
	searchBills: PosIncomingMethodsMethod<z.infer<typeof searchBillSchema>, ResponseType>;
	getTableContents: PosIncomingMethodsMethod<z.infer<typeof getTableContentsSchema>, ResponseType>;
	getTableList: PosIncomingMethodsMethod<unknown, ResponseType>;
	pairCustomer: PosIncomingMethodsMethod<z.infer<typeof pairCustomerSchema>, ResponseType>;
	paymentStart: PosIncomingMethodsMethod<z.infer<typeof paymentStartSchema>, ResponseType>;
	paymentProcessed: PosIncomingMethodsMethod<z.infer<typeof paymentProcessedSchema>, ResponseType>;
	paymentClosed: PosIncomingMethodsMethod<z.infer<typeof paymentClosedSchema>, void>;
	getOrderById: PosIncomingMethodsMethod<z.infer<typeof getOrderByIdSchema>, ResponseType>;

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

export interface MethodCallResponseOpts<TResult> {
	uuid: string | null;
	type: string;
	result: TResult | null;
}

export const methodCallRequestSchema = z.object({
	uuid: z.string().nullable(),
	method: z.string(),
	args: z.unknown(),
	type: z.literal('method-call-request'),
});

interface MethodCallRequestOpts<TArgs> {
	uuid: string | null;
	method: keyof PosIncomingMethods;
	args: TArgs;
}

export class PosIncomingMethodsV2 implements PosIncomingMethods {

	private createResult = <TResult>(tr: (x: ResponseType) => TResult | Promise<TResult>) => async (result: ResponseType, uuid: string): Promise<MethodCallResponseOpts<TResult>> => {
		return ({
			result: await tr(result),
			uuid,
			type: 'method-call-response',
		});
	};

	protected createRequest = <TArgs>(tr: (x: any) => TArgs | Promise<TArgs>) => async (data: unknown): Promise<MethodCallRequestOpts<TArgs>> => {
		const parsed = methodCallRequestSchema.parse(data);
		return {
			uuid: parsed.uuid,
			method: parsed.method as unknown as keyof PosIncomingMethods,
			args: await tr(parsed.args),
		};
	};

	protected createMethod<TArgs, TResult>(args: {
		method: keyof PosIncomingMethods;
		decode: (args: any) => Promise<TArgs>;
		encode: (result: ResponseType) => Promise<TResult>;
	}) {
		return ({
			decode: this.createRequest(args.decode),
			encode: this.createResult(args.encode),
		});
	}

	public readonly error = this.createMethod({
		method: 'error',
		decode: async ([ error, uuid ]) => errorArgs.parse({
			error,
			uuid,
		}),
		encode: async () => null,
	});

	public readonly getBill = this.createMethod({
		method: 'getBill',
		decode: async ([ billId, customerId ]) => getBillArgs.parse({
			idBill: billId,
			userId: customerId,
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
		decode: async ([ tableId, userId ]) => getTableContentsSchema.parse({
			tableId,
			userId,
		}),
		encode: async (result) => result,
	});

	public readonly getTableList = this.createMethod({
		method: 'getTableList',
		decode: async () => null,
		encode: async (result) => result,
	});

	public readonly pairCustomer = this.createMethod({
		method: 'pairCustomer',
		decode: async ([ ident, idCustomer ]) => pairCustomerSchema.parse({
			ident,
			idCustomer,
		}),
		encode: async () => null,
	});

	public readonly paymentClosed = this.createMethod({
		method: 'paymentClosed',
		decode: async ([ paymentId, state ]) => paymentClosedSchema.parse({
			paymentId,
			state,
		}),
		encode: async () => null,
	});

	public readonly paymentStart = this.createMethod({
		method: 'paymentStart',
		decode: async ([ payment ]) => paymentStartSchema.parse({
			payment,
		}),
		encode: async () => null,
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
