const {
	REACT_APP_BACKEND_API_PATH,
	NODE_ENV,
} = process.env;

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

const appEnvironment: Environment = (
	isValidEnvironment(NODE_ENV)
		? NODE_ENV
		: 'development'
);

/** the base url path for the backend api's */
const backendApiEndpoint: string = (
	REACT_APP_BACKEND_API_PATH
	?? 'http://localhost:5000'
);

const disableAuthConfig: Record<Environment, boolean> = {
	development: false,
	test: false,
	production: false,
};
/** should fetch authentication be disabled? */
const disableAuth = disableAuthConfig[appEnvironment];

export {
	appEnvironment,
	backendApiEndpoint,
	disableAuth,
};