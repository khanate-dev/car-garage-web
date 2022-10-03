// @ts-check

/** @type {import('stylelint').Config} */
const config = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
	],
	rules: {
		'indentation': 'tab',
		'no-missing-end-of-source-newline': null,
		'string-quotes': 'single',
		'declaration-block-no-redundant-longhand-properties': null,
		'no-descending-specificity': null,
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global']
			},
		]
	},
};

module.exports = config;