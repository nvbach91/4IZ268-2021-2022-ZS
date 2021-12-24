import type { Result } from 'neverthrow';

export interface Transport {
	authorize: (apiKeys: string[]) => Promise<boolean>;
}

export enum TransportType {
	WEBSOCKET = 'WEBSOCKET',
}

export enum ApiVersion {
	V2 = 'V2',
}

export type PosTransportSendMessage = (message: Record<string, unknown>) => Promise<PosTransportSendMessageResult>;

export type PosTransportSendMessageResult = Result<void, unknown>;
