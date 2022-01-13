import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { err, ok } from 'neverthrow';

import { defer } from '../utils';
import { methodCallRequestSchema } from '../posIncomingMethods';
import { AuthorizationError } from '../error';
import { posId } from '../connectionManager';

import type { PosConnectionCloseReason, PosTransportWebsocketProps } from '../@types/posTransportWebsocket';
import type { Transport } from '../@types/transport';
import type { PosIncomingMethods, ResponseType } from '../posIncomingMethods';
import type { Result } from 'neverthrow';
import type { RestaurantApikey } from '../store/apiKeysSlice';
import type { PosOutgoingMethods } from '../posOutgoingMethods';

export class PosTransportWebsocket implements Transport {
	private readonly ws: WebSocket;
	private readonly posIncomingMethods: PosIncomingMethods;
	private readonly posOutgoingMethods: PosOutgoingMethods;
	private authorized = false;
	private processMessage?: (message: unknown) => Promise<Result<ResponseType, Error>>;

	public constructor(props: PosTransportWebsocketProps) {
		this.ws = new WebSocket(props.url.replace('https://', 'wss://'));
		this.posIncomingMethods = props.posIncomingMethods;
		this.posOutgoingMethods = props.posOutgoingMethods;
	}

	public setMessageHandler(callback: (message: unknown) => Promise<Result<ResponseType, Error>>): void {
		this.processMessage = callback;
	}

	private async onWebsocketClose(event: CloseEvent) {
		// this.removeListeners();
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

		const decodedData = await this.posIncomingMethods[method as keyof PosIncomingMethods].decode(message.data);
		if (typeof this.processMessage !== 'function') return;
		const data = await this.processMessage(decodedData);
		if (data.isOk()) {
			const x = await this.posIncomingMethods[method as keyof PosIncomingMethods].encode(data.value, decodedData.uuid ?? '');
			this.ws.send(JSON.stringify(x));
		}
	}

	private async onWebsocketError(event: Event) {
		this.removeListeners();
	}

	public removeListeners() {
		this.ws.removeEventListener('close', this.onWebsocketClose);
		this.ws.removeEventListener('message', this.onWebsocketMessage);
		this.ws.removeEventListener('error', this.onWebsocketError);
	}

	private async sendMessage(method: keyof PosOutgoingMethods, uuid: string, message: Record<string, unknown> = {}) {
		const encodedMessage = await this.posOutgoingMethods[method].encode(message, uuid);
		return this.ws.send(JSON.stringify(encodedMessage));
	}

	private async receiveMessage(uuid: string): Promise<unknown> {
		const deferPromise = defer<Record<string, unknown>>();
		const callback = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			if (data.uuid === uuid) {
				deferPromise.resolve(data);
			}
		};
		this.ws.addEventListener('message', callback);
		const result = await deferPromise.promise;
		this.ws.removeEventListener('message', callback);
		return result;
	}

	public async sendAndReceiveResponse<Method extends keyof PosOutgoingMethods>(method: Method, data: Record<string, unknown> = {}): Promise<ReturnType<PosOutgoingMethods[Method]['decode']>> {
		const uuid = uuidv4();
		const result: Promise<unknown> = this.receiveMessage(uuid);
		await this.sendMessage(method, uuid, data);
		return this.posOutgoingMethods[method].decode(await result);
	}

	public async authorize(apiKeys: string[]): Promise<Result<RestaurantApikey, AuthorizationError>> {
		await new Promise((resolve) => {
			this.ws.addEventListener('open', resolve);
		});
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
		await this.ws.send(JSON.stringify({
			apiKey: apiKeys,
			posId,
			type: 'auth-request',
		}));
		const authResult = responseSchema.parse(await deferPromise.promise);
		clearTimeout(timeout);
		this.ws.removeEventListener('message', callback);
		this.authorized = authResult.authorized;
		if (authResult.authorized === false) {
			return err(new AuthorizationError('Unauthorized'));
		}
		this.ws.addEventListener('close', this.onWebsocketClose);
		this.ws.addEventListener('message', this.onWebsocketMessage.bind(this));
		this.ws.addEventListener('error', this.onWebsocketError);
		const restaurant = await this.sendAndReceiveResponse('whoAmI');
		return ok({
			id: restaurant.result[0].id,
			name: restaurant.result[0].name,
			apiKey: apiKeys[0],
		});
	}

	public close(reason: PosConnectionCloseReason): void {
		this.ws.close(3001, reason.reason);
	}
}
