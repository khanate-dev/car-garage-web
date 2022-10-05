const {
	REACT_APP_BACKEND_API_PATH,
	NODE_ENV,
} = process.env;

if (!REACT_APP_BACKEND_API_PATH) {
	throw new Error('Backend api path environment not found!');
}

const environments = [
	'development',
	'test',
	'production',
] as const;
type Environment = typeof environments[number];

const isValidEnvironment = (
	environment?: string
): environment is Environment => (
	environment !== undefined
	&& environments.includes(environment as any)
);

export const appEnvironment: Environment = (
	isValidEnvironment(NODE_ENV)
		? NODE_ENV
		: 'development'
);

/** the base url path for the backend api's */
export const backendApiEndpoint: string = REACT_APP_BACKEND_API_PATH;

const disableAuthConfig: Record<Environment, boolean> = {
	development: false,
	test: false,
	production: false,
};
/** should fetch authentication be disabled? */
export const disableAuth = disableAuthConfig[appEnvironment];