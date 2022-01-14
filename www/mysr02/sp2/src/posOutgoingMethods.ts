import * as z from 'zod';

interface PosOutgoingMethodsMethod<TArgs, TResult> {
	encode: (args: TArgs, uuid: string | null) => Promise<MethodCallRequestOpts<unknown[]>>;
	decode: (response: unknown) => Promise<MethodCallResponseOpts<TResult>>;
}

const whoAmIResponse = z.array(z.object({
	id: z.string(),
	name: z.string(),
}));

export interface PosOutgoingMethods {
	whoAmI: PosOutgoingMethodsMethod<Record<string, unknown>, z.infer<typeof whoAmIResponse>>;
}

interface MethodCallRequestOpts<TArgs> {
	uuid: string | null;
	method: keyof PosOutgoingMethods;
	args: TArgs;
	type: string;
}

interface MethodCallResponseOpts<TResult> {
	result: TResult;
	uuid: string | null;
}

export const methodCallRequestSchema = z.object({
	uuid: z.string().nullable(),
	method: z.string(),
	args: z.unknown(),
	type: z.literal('method-call-request'),
});

const responseSchema = z.object({
	type: z.literal('method-call-response'),
	uuid: z.string().nullable(),
	result: z.unknown(),
});

export class PosOutgoingMethodsV2 implements PosOutgoingMethods {

	private createResult = <TResult>(tr: (x: unknown) => TResult | Promise<TResult>) => async (response: unknown): Promise<MethodCallResponseOpts<TResult>> => {
		const parsed = responseSchema.parse(response);
		return ({
			result: await tr(parsed.result),
			uuid: parsed.uuid,
		});
	};

	protected createRequest = <TArgs>(method: keyof PosOutgoingMethods, uuid: string | null, encodedArgs: TArgs): MethodCallRequestOpts<TArgs> => {
		return {
			uuid,
			method,
			args: encodedArgs,
			type: 'method-call-request',
		};
	};

	protected createMethod<TArgs, TResult>(args: {
		method: keyof PosOutgoingMethods;
		encode: (args: Record<string, unknown>) => Promise<TArgs>;
		decode: (result: unknown) => Promise<TResult>;
	}) {
		return ({
			encode: async (encodeArgs: Record<string, unknown>, uuid: string | null) => this.createRequest(args.method, uuid, await args.encode(encodeArgs)),
			decode: this.createResult(args.decode),
		});
	}

	public readonly whoAmI = this.createMethod({
		method: 'whoAmI',
		decode: async (result) => whoAmIResponse.parse(result),
		encode: async () => ([]),
	});

}
