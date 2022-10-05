/// <reference types="react-scripts" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REACT_APP_BACKEND_API_PATH?: string,
			REACT_APP_IMGUR_CLIENT_ID?: string,
			REACT_APP_IMGUR_CLIENT_SECRET?: string,
			REACT_APP_IMGUR_REFRESH_TOKEN?: string,
		}
	}
}
export { };