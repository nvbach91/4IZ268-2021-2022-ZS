import { Component, createContext, useContext } from 'react';
import { Connection } from './connection';
import { ApiVersion, TransportType } from './@types/transport';

export interface ConnectionContext {
	connect: (apiKeys: string[]) => Promise<boolean>;
	disconnect: () => Promise<void>;
	connection: Connection | null;
}

const ConnectionManagerContext = createContext<ConnectionContext>({
	connect: async () => false,
	disconnect: async () => undefined,
	connection: null,
});

export const useAppContext = () => {
	return useContext(ConnectionManagerContext);
};
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'https://sandbox.qerko.com';

export class ConnectionManager extends Component {
	private connection: Connection | null = null;

	async connect(apiKeys: string[]) {
		const connection = new Connection(apiUrl, TransportType.WEBSOCKET, ApiVersion.V2);
		const result = await connection.authorize(apiKeys);
		return result;
	}

	async disconnect() {
		if (this.connection !== null) await this.connection.disconnect();
	}

	render() {
		return (
			<ConnectionManagerContext.Provider value={{ connect: this.connect, disconnect: this.disconnect, connection: this.connection }}>
				{this.props.children}
			</ConnectionManagerContext.Provider>
		);
	}
}
