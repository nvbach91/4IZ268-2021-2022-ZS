// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withSourceMaps = require('@zeit/next-source-maps');

const {
	PUBLIC_URL = '',
	API_URL = 'https://sandbox.qerko.com',
	QR_CODE_GENERATOR_URL = '',
} = process.env;

module.exports = {
	webpack5: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	...withSourceMaps({
		basePath: PUBLIC_URL,
		reactStrictMode: true,
		poweredByHeader: false,
		trailingSlash: true,
		webpack(config) {
			config.resolve.modules.push(path.resolve("./"));
			return config;
		},
		typescript: {
			ignoreBuildErrors: true,
		},
		env: {
			NEXT_PUBLIC_API_URL: API_URL,
			NEXT_PUBLIC_QR_CODE_GENERATOR_URL: QR_CODE_GENERATOR_URL,
		},
	}),
};
