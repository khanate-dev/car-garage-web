import {
	backendApiEndpoint,
	disableAuth,
	isFetchMocked,
} from 'config/app';
import { ApiError } from 'errors/api';
import { invalidateUser } from 'helpers/events';
import { getSetting } from 'helpers/settings';

import { FetchOptions, GenericFetchResponse } from 'types/fetch';

const fetchRequest = async <Response = GenericFetchResponse>(
	apiPath: string,
	options: FetchOptions = {}
): Promise<Response> => {
	try {

		const { noAuth, body, ...otherOptions } = options;

		if (!isFetchMocked) {
			if (!navigator.onLine) {
				throw new ApiError(
					'Not Connected To The Internet!',
					'InternetConnectionError'
				);
			}
		}

		const requestOptions: RequestInit = otherOptions as RequestInit;

		if (!noAuth && !disableAuth) {
			const user = getSetting('user');
			if (!user) {
				throw new ApiError(
					'User Auth Token Not Found!',
					'ApiAuthError'
				);
			}
			requestOptions.headers = {
				...requestOptions.headers,
				Authorization: `Bearer ${user.token}`,
			};
		}

		if (body) {

			const isJson = !(body instanceof FormData);

			requestOptions.body = (
				isJson
					? JSON.stringify(body)
					: body
			);

			if (isJson) {
				requestOptions.headers = {
					...requestOptions.headers,
					'Content-Type': 'application/json',
				};
			}

		}

		const requestPath = `${backendApiEndpoint}/${apiPath}`;

		const response = await fetch(requestPath, requestOptions);

		if (response.status === 401) {
			throw new ApiError(
				'Login Expired!',
				'ApiAuthError'
			);
		}

		const json = await response.json();

		const isError = (
			!response.ok
			|| json.statusCode !== 200
			|| (json.error?.errorCode && parseInt(json?.error?.errorCode) !== 0)
		);

		if (isError) {
			return Promise.reject(new ApiError(
				json?.message
				?? json?.error?.errorDescription
				?? json?.error?.errorMessage
				?? (
					typeof json?.error === 'string'
						? json?.error
						: 'There Was A Problem With The Request!'
				),
				'ApiError'
			));
		}

		return json.data;

	}
	catch (error: any) {
		if (error instanceof ApiError) {
			if (error.type === 'ApiAuthError') {
				invalidateUser();
			}
			return Promise.reject(error);
		}
		return Promise.reject(
			new ApiError(
				`Error Fetching From API: ${error.message ?? error}`,
				'ApiConnectionError'
			)
		);
	}
};

export default fetchRequest;