import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ConnectionManager } from '../src/connectionManager';
import { PosLayout } from '../layouts/PosLayout';
import { theme } from '../src/theme';
import store from '../src/store/store';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (<>
		<Head>
			<title>Point of sale</title>
			<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
			<link rel="manifest" href={`${router.basePath}/manifest.json`} />
			<link rel="icon" href={'https://sandbox.qerko.com/restaurant-admin/favicon.ico'} />
			<link rel="apple-touch-icon" href={'https://sandbox.qerko.com/restaurant-admin/logo192.png'} />
		</Head>
		{typeof localStorage !== 'undefined' && <Provider store={store}>
			<StyledEngineProvider injectFirst>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={theme}>
						<ConnectionManager>
							{
								router.pathname === '/' ? (
									<Component {...pageProps} />
								) : (
									<PosLayout>
										<>
											<Component {...pageProps} />
										</>
									</PosLayout>
								)
							}
						</ConnectionManager>
					</ThemeProvider>
				</QueryClientProvider>
			</StyledEngineProvider>
		</Provider>}
	</>
	);
}
