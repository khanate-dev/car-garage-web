import {
	backendApiEndpoint,
	disableAuth,
} from 'config';
import { ApiError } from 'errors/api';

import { invalidateUser } from 'helpers/events';
import { getSetting, setSetting } from 'helpers/settings';
import { jwtSchema } from 'schemas/auth';

import { ApiResponse, FetchOptions, FetchResponse } from 'types/fetch';

const fetchRequest = async <Response extends ApiResponse>(
	apiPath: string,
	options: FetchOptions = {}
): Promise<Response> => {
	try {

		const { noAuth, body, ...otherOptions } = options;

		if (!navigator.onLine) {
			throw new ApiError(
				'Not Connected To The Internet!',
				'InternetConnectionError'
			);
		}

		const requestOptions: RequestInit = otherOptions as RequestInit;

		if (!noAuth && !disableAuth) {
			const accessToken = getSetting('accessToken');
			const refreshToken = getSetting('refreshToken');
			if (!accessToken || !refreshToken) {
				throw new ApiError(
					'User Auth Token Not Found!',
					'ApiAuthError'
				);
			}
			requestOptions.headers = {
				...requestOptions.headers,
				Authorization: `Bearer ${accessToken}`,
				'x-refresh': refreshToken,
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

		const newAccessToken = response.headers.get('x-access-token');
		if (newAccessToken) {
			try {
				const setting = jwtSchema.parse(newAccessToken);
				setSetting('accessToken', setting);
			} catch { } // eslint-disable-line no-empty
		}

		const json = await response.json();

		const { ok, response: parsedResponse }: FetchResponse<Response> = {
			ok: response.ok,
			response: json,
		};

		if (!ok) {
			throw new ApiError(
				parsedResponse.message,
				'ApiError'
			);
		}

		return parsedResponse;

	}
	catch (error: any) {
		if (error instanceof ApiError) {
			if (error.type === 'ApiAuthError') {
				invalidateUser();
			}
			return Promise.reject(error);
		}
		throw new ApiError(
			`Error Fetching From API: ${error.message ?? error}`,
			'ApiConnectionError'
		);
	}
};

export default fetchRequest;
