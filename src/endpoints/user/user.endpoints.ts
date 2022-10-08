import { UserSansPassword, userSansPasswordModelSchema } from 'schemas/user';
import { registerRequestSchema } from 'schemas/auth';

import { postRequest } from 'helpers/api';

export const createUser = async (
	formData: FormData
): Promise<UserSansPassword> => {
	const json = registerRequestSchema.parse(Object.fromEntries(formData));
	const response = await postRequest('user', json, true);
	return userSansPasswordModelSchema.parse(response);
};
