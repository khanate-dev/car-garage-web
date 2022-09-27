export interface FetchBaseOptions extends Omit<RequestInit, 'body'> {

	/** the HTTP method of the request */
	method?: (
		| 'GET'
		| 'PUT'
		| 'PATCH'
		| 'DELETE'
		| 'POST'
	),

	/** should the authorization headers be sent? */
	noAuth?: boolean,

	/** the body to send with the request */
	body?: Record<string, any> | Record<string, any>[] | FormData,

}

export interface FetchNoBodyOptions extends FetchBaseOptions {

	/** the HTTP method of the request */
	method?: 'GET' | 'DELETE',

	body?: undefined,

}

export interface FetchBodyOptions extends FetchBaseOptions {

	/** the HTTP method of the request */
	method: 'PUT' | 'PATCH' | 'POST',

	/** the body to send with the request */
	body: FetchBaseOptions['body'],

}

export type FetchOptions = (
	| FetchNoBodyOptions
	| FetchBodyOptions
);

export interface ErrorResponse {
	ok: false,
	response: {
		type: string,
		message: string,
		[x: string]: any,
	},
}

export type ApiResponse = (
	| Record<string, any>
	| Record<string, any>[]
);

export interface SuccessResponse<Response extends ApiResponse> {
	ok: true,
	response: Response,
}

export type FetchResponse<Response extends ApiResponse> = (
	| ErrorResponse
	| SuccessResponse<Response>
);