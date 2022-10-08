import {
	loginRequestSchema,
	LoginResponse,
	loginResponseSchema,
} from 'schemas/auth';

import { postRequest } from 'helpers/api';

export const createSession = async (
	formData: FormData
): Promise<LoginResponse> => {
	const json = loginRequestSchema.parse(Object.fromEntries(formData));
	const response = await postRequest('session', json, true);
	return loginResponseSchema.parse(response);
};
