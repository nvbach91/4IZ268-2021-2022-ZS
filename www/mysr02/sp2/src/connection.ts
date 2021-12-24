import type { Transport } from './@types/transport';
import { ApiVersion, TransportType } from './@types/transport';
import { PosTransportWebsocket } from './transport/posTransportWebsocket';
import { PosIncomingMethodsV2 } from './PosIncomingMethods';
import assertNever from 'assert-never';

export class Connection {
	private transport: Transport;

	public constructor(apiUrl: string, type: TransportType, apiVersion: ApiVersion) {
		if (type === TransportType.WEBSOCKET) {
			if (apiVersion === ApiVersion.V2) {
				this.transport = new PosTransportWebsocket({
					url: apiUrl + '/api/v2/pos/ws',
					posIncomingMethods: new PosIncomingMethodsV2(),
					onMessage: () => undefined,
				});
				return this;
			}
			assertNever(apiVersion);
		}
		assertNever(type);
	}

	public async disconnect(): Promise<void> {
		return;
	}

	public async authorize(apiKeys: string[]) {
		return this.transport.authorize(apiKeys);
	}
}
