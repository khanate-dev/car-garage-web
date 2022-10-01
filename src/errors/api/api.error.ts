import { ApiErrorType } from './api.error.types';

class ApiError extends Error {
	type: ApiErrorType;
	constructor(message: string, type: ApiErrorType = 'ApiError') {
		super(message, {
			cause: type,
		});
		this.name = type;
		this.type = type;
	}
}

export default ApiError;