const {
	REACT_APP_BACKEND_API_PATH,
	REACT_APP_IMGUR_CLIENT_ID,
	REACT_APP_IMGUR_CLIENT_SECRET,
	REACT_APP_IMGUR_REFRESH_TOKEN,
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

export const appEnvironment: Environment = (
	isValidEnvironment(NODE_ENV)
		? NODE_ENV
		: 'development'
);

/** the base url path for the backend api's */
export const backendApiEndpoint: string = (
	REACT_APP_BACKEND_API_PATH
	?? 'http://localhost:5000'
);

export const imgurAuth = {
	clientId: REACT_APP_IMGUR_CLIENT_ID ?? '',
	clientSecret: REACT_APP_IMGUR_CLIENT_SECRET ?? '',
	refreshToken: REACT_APP_IMGUR_REFRESH_TOKEN ?? '',
};

const disableAuthConfig: Record<Environment, boolean> = {
	development: false,
	test: false,
	production: false,
};
/** should fetch authentication be disabled? */
export const disableAuth = disableAuthConfig[appEnvironment];