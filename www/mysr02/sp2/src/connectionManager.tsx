import { createContext, useCallback, useContext, useState } from 'react';
import { err } from 'neverthrow';

import { Connection } from './connection';
import { ApiVersion, TransportType } from './@types/transport';
import { AuthorizationError } from './error';

import type { ReactElement } from 'react';
import type { Result } from 'neverthrow';
import type { RestaurantApikey } from './store/apiKeysSlice';

export interface ConnectionContext {
	connect: (apiKeys: string[]) => Promise<Result<RestaurantApikey, AuthorizationError>>;
	disconnect: () => Promise<void>;
	connection: Connection | null;
	restaurant: RestaurantApikey | null;
}

export const ConnectionManagerContext = createContext<ConnectionContext>({
	connect: async () => err(new AuthorizationError('')),
	disconnect: async () => undefined,
	connection: null,
	restaurant: null,
});

export const useAppContext = () => {
	return useContext(ConnectionManagerContext);
};
export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'https://sandbox.qerko.com';
export const posId = '73e13587-fbb3-4f4f-bb02-817b48347e8f';

export const ConnectionManager = (props: { children: ReactElement}) => {
	const [ connection, setConnection ] = useState<Connection | null>(null);
	const [ restaurant, setRestaurant ] = useState<RestaurantApikey | null>(null);
	const connect = useCallback(async (apiKeys: string[]): Promise<Result<RestaurantApikey, AuthorizationError>> => {
		const connection = new Connection(apiUrl, TransportType.WEBSOCKET, ApiVersion.V2);
		const result = await connection.authorize(apiKeys);
		if (result.isOk()) {
			setConnection(connection);
			setRestaurant(result.value);
		} else {
			await connection.disconnect();
		}
		return result;
	}, []);

	const disconnect = useCallback(async () => {
		if (connection !== null) await connection.disconnect();
		setConnection(null);
		setRestaurant(null);
	}, [ connection ]);

	return (
		<ConnectionManagerContext.Provider value={{ connect: connect, disconnect: disconnect, connection: connection, restaurant: restaurant }}>
			{props.children}
		</ConnectionManagerContext.Provider>
	);
};
