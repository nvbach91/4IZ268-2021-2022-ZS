import assertNever from 'assert-never';
import { err, ok } from 'neverthrow';

import { ApiVersion, TransportType } from './@types/transport';
import { PosTransportWebsocket } from './transport/posTransportWebsocket';
import { PosIncomingMethodsV2 } from './posIncomingMethods';
import { PosOutgoingMethodsV2 } from './posOutgoingMethods';
import { billSelector, posActions, tableSelector } from './store/posSlice';
import store from './store/store';
import { PosConnectionCloseReason } from './@types/posTransportWebsocket';
import { assertNotUndefined } from './utils/assert';

import type { Transport } from './@types/transport';

export class Connection {
	private transport: Transport;

	public constructor(apiUrl: string, type: TransportType, apiVersion: ApiVersion) {
		if (type === TransportType.WEBSOCKET) {
			if (apiVersion === ApiVersion.V2) {
				this.transport = new PosTransportWebsocket({
					url: apiUrl + '/api/v2/pos/ws',
					posIncomingMethods: new PosIncomingMethodsV2(),
					posOutgoingMethods: new PosOutgoingMethodsV2(),
				});
				return this;
			}
			assertNever(apiVersion);
		}
		assertNever(type);
	}

	public async disconnect(): Promise<void> {
		this.transport.close(PosConnectionCloseReason.OTHER);
	}

	public async authorize(apiKeys: string[]) {
		const result = await this.transport.authorize(apiKeys);
		if (result.isOk()) {
			this.transport.setMessageHandler(
				async (message: any) => {
					if (message.method === 'getTableList') {
						const data = tableSelector(result.value.id).selectAll(store.getState());
						return data === undefined ? err(new Error('')) : ok(data);
					}
					if (message.method === 'getTableContents') {
						const data = billSelector(result.value.id).selectAll(store.getState()).filter((bill) => bill.tableId === message.args.tableId);
						return data === undefined ? err(new Error('')) : ok(data);
					}
					if (message.method === 'paymentStart') {
						const data = billSelector(result.value.id).selectById(store.getState(), message.args.payment.idBill);
						assertNotUndefined(data);
						store.dispatch(posActions.changeBill({
							bill: {
								...data,
								paymentId: message.args.payment.id,
							},
							restaurantId: result.value.id,
						}));
						return ok(null);
					}
					if (message.method === 'getBill') {
						const data = billSelector(result.value.id).selectById(store.getState(), message.args.idBill);
						return data === undefined ? err(new Error('')) : ok(data);
					}
					if (message.method === 'paymentProcessed') {
						const data = billSelector(result.value.id).selectAll(store.getState()).find((bill) => bill.paymentId === message.args.paymentId);
						assertNotUndefined(data);
						return ok({
							receiptInfo: {
								billName: data.name,
								timestamp: (new Date()).toISOString(),
								serial: '2',
							},
							items: data.items,
							taxInfo: [],
							fiscalInfo: null,
						});
					}
					if (message.method === 'paymentClosed') {
						const data = billSelector(result.value.id).selectAll(store.getState()).find((bill) => bill.paymentId === message.args.paymentId);
						assertNotUndefined(data);
						if (message.args.state !== 'PAID') {
							store.dispatch(posActions.changeBill({
								bill: {
									...data,
									paymentId: null,
								},
								restaurantId: result.value.id,
							}));
						} else {
							store.dispatch(posActions.removeBill({
								bill: data,
								restaurantId: result.value.id,
							}));
						}
						return ok(null);
					}
					return ok(null);
				}
			);
		} else {
			await this.disconnect();
		}
		return result;
	}
}
