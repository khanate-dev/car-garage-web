const {
	REACT_APP_BACKEND_API_PATH,
	REACT_APP_NATS_SERVER,
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

/** the base url path for the NATS WebSocket server */
const natsServer: string = (
	REACT_APP_NATS_SERVER
	?? 'ws://localhost:4222'
);

const isFetchMockedConfig: Record<Environment, boolean> = {
	development: true,
	test: true,
	production: false,
};
/** should the app use dummy data? used for demos of the frontend */
const isFetchMocked: boolean = isFetchMockedConfig[appEnvironment];

/** should notifications be turned off? */
const disableNotifications = true;

const disableAuthConfig: Record<Environment, boolean> = {
	development: true,
	test: true,
	production: true,
};
/** should fetch authentication be disabled? */
const disableAuth = disableAuthConfig[appEnvironment];

export {
	appEnvironment,
	backendApiEndpoint,
	natsServer,
	isFetchMocked,
	disableNotifications,
	disableAuth,
};