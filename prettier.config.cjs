/** @type {import("prettier").Config} */
const config = {
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	tabWidth: 4,
	useTabs: true,
	semi: true,
	arrowParens: 'always',
	singleQuote: true,
	trailingComma: 'all',
};

module.exports = config;
