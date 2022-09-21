// @ts-check

const defaultRules = [
	// TODO Disabled because of yarn issues. Investigate if it causes any problems
	// // 'react-app',
	'eslint:recommended',
	'plugin:react/recommended',
	'plugin:react/jsx-runtime',
];

/** @type {import('eslint').Linter.Config} */
const config = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
		node: true,
	},
	extends: defaultRules,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		indent: ['off', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'never',
		}],
		'no-console': ['error', {
			allow: ['warn', 'error', 'info'],
		}],
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			plugins: ['@typescript-eslint'],
			extends: [
				...defaultRules,
				'plugin:@typescript-eslint/recommended',
			],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-inferrable-types': 'off',
				'@typescript-eslint/no-unnecessary-type-constraint': 'off',
				'@typescript-eslint/member-delimiter-style': ['error', {
					multiline: {
						delimiter: 'comma',
						requireLast: true,
					},
					singleline: {
						delimiter: 'comma',
						requireLast: true,
					},
				}],
			},
		},
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
};

module.exports = config;