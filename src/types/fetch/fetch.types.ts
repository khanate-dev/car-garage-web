import { GenericObject } from 'types/general';

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
	body?: GenericObject | GenericObject[] | FormData,

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

export type GenericFetchResponse = (
	| GenericObject
	| GenericObject[]
);