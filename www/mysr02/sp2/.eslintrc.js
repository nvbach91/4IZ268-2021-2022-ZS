module.exports = {
	root: true,
	parser: '@typescript-eslint/parser', // the TypeScript parser we installed earlier
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'../.eslintrc.js',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
	],
	rules: {
		'@typescript-eslint/indent': [ 'error', 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 1,
			outerIIFEBody: 1,
			FunctionDeclaration: {
				parameters: 1,
				body: 1,
			},
			FunctionExpression: {
				parameters: 1,
				body: 1,
			},
			CallExpression: {
				arguments: 1,
			},
			ArrayExpression: 1,
			ObjectExpression: 1,
			ImportDeclaration: 1,
			flatTernaryExpressions: false,
		} ],

		'@typescript-eslint/consistent-type-imports': [ 'error' ],
		'react/prop-types': 'off',

		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': [
			'error', {
				enableDangerousAutofixThisMayCauseInfiniteLoops: true,
			},
		],
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					'@material-ui/*',
					'@material-ui/*/*',
					'@material-ui/*/*/*',
					'!@material-ui/core',
					'!@material-ui/core/colors',
					'!@material-ui/core/styles',
					'!@material-ui/lab',
					'!@material-ui/pickers',
					'!@material-ui/pickers/**',
					'!@material-ui/pickers/constants/prop-types',
					'!@material-ui/icons',
					// '!@material-ui/core/styles',
				],
			},
		],
	},
	globals: {
		React: 'writable',
	},
	overrides: [
		{
			files: [ '**/.eslintrc.js' ],
			rules: {
				'no-undef': 'off',
			},
		},
		{
			files: [ 'next.config.js' ],
			env: { node: true },
		},
		{
			files: [ 'bin/**' ],
			env: { node: true },
		},
	],
};
