import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { theme } from '../src/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { PosLayout } from '../layouts/PosLayout';
import type { AppProps } from 'next/app';
import DateFnsUtils from '@date-io/date-fns';
import en from 'date-fns/locale/en-GB';
import { LocalizationProvider } from '@mui/lab';
import { ConnectionManager } from '../src/connectionManager';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (<>
		<Head>
			<title>Point of sale</title>
			<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
			<link rel="manifest" href={`${router.basePath}/manifest.json`} />
			<link rel="icon" href={`${router.basePath}/favicon.ico`} />
			<link rel="apple-touch-icon" href={`${router.basePath}/logo192.png`} />
		</Head>
		{typeof localStorage !== 'undefined' && <>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<LocalizationProvider dateAdapter={DateFnsUtils} locale={en}>
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
					</LocalizationProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</>}
	</>
	);
}
