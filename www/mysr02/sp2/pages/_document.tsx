import React from 'react';
import Document, {
	Html, Main, Head, NextScript,
} from 'next/document';
import ServerStyleSheets from '@mui/styles/ServerStyleSheets';

import { theme } from '../src/theme';

import type { DocumentContext } from 'next/document';

export default class MyDocument extends Document {

	static getInitialProps = async (ctx: DocumentContext) => {
		// Render app and page and get the context of the page with collected side effects.
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () => originalRenderPage({
			// @ts-expect-error strange bug
			// eslint-disable-next-line react/display-name
			enhanceApp: (App: React.FunctionComponent) => (props: Record<string, unknown>) => sheets.collect(<App {...props} />),
		});

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: [ ...React.Children.toArray(initialProps.styles), sheets.getStyleElement() ],
		};
	};

	render(): React.ReactElement {
		return (
			<Html lang="en" style={{ background: 'linear-gradient(45deg, #18760099, #08ad526b 50%)', minHeight: '100%' }}>
				<Head>
					{/* PWA primary color */}
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
				</Head>
				<body style={{ margin: 0 }}>
					<Main/>
					<NextScript />
				</body>
			</Html>
		);
	}
}
