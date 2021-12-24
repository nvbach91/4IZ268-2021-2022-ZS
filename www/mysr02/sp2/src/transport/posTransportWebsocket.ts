import type { PosTransportSendMessage, Transport } from '../@types/transport';
import type { PosTransportWebsocketProps } from '../@types/posTransportWebsocket';
import { PosConnectionCloseReason, WebSocketReadyState } from '../@types/posTransportWebsocket';
import { defer } from '../utils';
import * as z from 'zod';
import type { PosIncomingMethods } from '../PosIncomingMethods';
import { methodCallRequestSchema } from '../PosIncomingMethods';

export class PosTransportWebsocket implements Transport {
	private readonly ws: WebSocket;
	private readonly posIncomingMethods: PosIncomingMethods;
	private authorized = false;
	private readonly processMessage: (message: unknown) => unknown;

	public constructor(props: PosTransportWebsocketProps) {
		this.ws = new WebSocket(props.url.replace('https://', 'wss://'));
		this.posIncomingMethods = props.posIncomingMethods;
		this.processMessage = props.onMessage;
	}

	private async onWebsocketClose(event: CloseEvent) {
		await this.close(PosConnectionCloseReason.OTHER);
	}

	private async onWebsocketMessage(event: MessageEvent) {
		const message = methodCallRequestSchema.safeParse(JSON.parse(event.data));
		if (!message.success) {
			return;
		}
		const method = message.data.method;
		if (!(method in this.posIncomingMethods)) {
			return;
		}
		const processedData = this.posIncomingMethods[method as keyof PosIncomingMethods];
	}

	private async onWebsocketError(event: Event) {
		await this.close(PosConnectionCloseReason.OTHER);
	}

	public removeListeners() {
		this.ws.removeEventListener('close', this.onWebsocketClose);
		this.ws.removeEventListener('message', this.onWebsocketMessage);
		this.ws.removeEventListener('error', this.onWebsocketError);
	}

	public sendMessage: PosTransportSendMessage = async (message) => {
		this.ws.send(JSON.stringify(message));
	};

	// public async receiveMessage<T>(schema: ZodType<T>): Promise<Result<z.infer<T>, ZodError>> {
	// 	const deferPromise = defer();
	// 	this.ws.addEventListener('message', (event: MessageEvent<any>) => {
	// 		deferPromise.resolve(JSON.parse(event.data));
	// 		return true;
	// 	});
	// 	const result = schema.safeParse(await deferPromise.promise);
	// 	return result.success ? ok(result.data) : err(result.error);
	// }
	//
	// public async sendAndReceiveResponse<TZodSchema extends z.ZodSchema<any>>(method: keyof PosIncomingMethods, schema: TZodSchema): Promise<Result<z.infer<TZodSchema>, AuthorizationError>> {
	// 	const uuid =
	// }

	public async authorize(apiKeys: string[]): Promise<boolean> {

		console.log('opening');
		await new Promise((resolve) => {
			this.ws.addEventListener('open', resolve);
		});
		console.log('opened');
		const responseSchema = z.object({
			authorized: z.boolean(),
			type: z.literal('auth-response'),
		});
		const deferPromise = defer<unknown>();
		const callback = (event: MessageEvent) => {
			deferPromise.resolve(JSON.parse(event.data));
		};
		const timeout = setTimeout(() => deferPromise.resolve({
			authorized: false,
			type: 'auth-response',
		}), 5000);
		this.ws.addEventListener('message', callback);
		await this.sendMessage({
			apiKey: apiKeys,
			posId: "73e13587-fbb3-4f4f-bb02-817b48347e8f",
			type: "auth-request",
		});
		const authResult = responseSchema.parse(await deferPromise.promise);
		clearTimeout(timeout);
		this.ws.removeEventListener('message', callback);
		if (authResult.authorized === true) {
			this.ws.addEventListener('close', this.onWebsocketClose);
			this.ws.addEventListener('message', this.onWebsocketMessage);
			this.ws.addEventListener('error', this.onWebsocketError);
		}
		this.authorized = authResult.authorized;
		return authResult.authorized;
	}

	public close(reason: PosConnectionCloseReason): void {
		if (this.ws.readyState === WebSocketReadyState.CLOSING || this.ws.readyState === WebSocketReadyState.CLOSED) {
			return;
		}
		this.removeListeners();
		this.ws.close(reason.httpStatus, reason.reason);
	}
}
