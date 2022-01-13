import type { PosConnectionCloseReason } from './posTransportWebsocket';
import type { ResponseType } from '../posIncomingMethods';
import type { Result } from 'neverthrow';
import type { RestaurantApikey } from '../store/apiKeysSlice';
import type { AuthorizationError } from '../error';

export interface Transport {
	authorize: (apiKeys: string[]) => Promise<Result<RestaurantApikey, AuthorizationError>>;
	setMessageHandler(callback: (message: unknown) => Promise<Result<ResponseType, Error>>): void;
	close: (reason: PosConnectionCloseReason) => void;
}

export enum TransportType {
	WEBSOCKET = 'WEBSOCKET',
}

export enum ApiVersion {
	V2 = 'V2',
}

export type PosTransportSendMessage = (message: Record<string, unknown>) => Promise<PosTransportSendMessageResult>;

export type PosTransportSendMessageResult = Result<void, unknown>;
