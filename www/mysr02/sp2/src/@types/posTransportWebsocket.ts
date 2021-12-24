import type { PosIncomingMethods } from '../PosIncomingMethods';

export interface PosTransportWebsocketProps {
	url: string;
	posIncomingMethods: PosIncomingMethods;
	onMessage: (message: unknown) => unknown;
}

export enum WebSocketReadyState {
	CONNECTING = 0,
	OPEN = 1,
	CLOSING = 2,
	CLOSED = 3,
}

export class PosConnectionCloseReason {

	static SUCCESS = new PosConnectionCloseReason(200, "SUCCESS");
	static CONFLICT = new PosConnectionCloseReason(409, "CONFLICT");
	static SERVICE_UNAVAILABLE = new PosConnectionCloseReason(503, "SERVICE_UNAVAILABLE"); // abort connection by Qerko
	static OTHER = new PosConnectionCloseReason(500, "OTHER"); // abort connection by other side
	static AUTHORIZATION = new PosConnectionCloseReason(401, "AUTHORIZATION");
	static GRACEFUL_END = new PosConnectionCloseReason(200, "GRACEFUL_END");

	private constructor(
		public readonly httpStatus: number,
		public readonly reason: string,
	) {
	}
}
