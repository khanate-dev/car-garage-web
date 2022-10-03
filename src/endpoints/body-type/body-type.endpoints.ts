import { z } from 'zod';

import {
	bodyTypeModelSchema,
	CreateBodyTypeResponse,
	createBodyTypeResponseSchema,
	createBodyTypeSchema,
} from 'schemas/body-type';

import { getRequest, postRequest } from 'helpers/api';

export const getBodyTypes = async () => {
	const bodyTypes = await getRequest('body-type');
	return z.array(bodyTypeModelSchema).parse(bodyTypes);
};

export const createBodyType = async (
	formData: FormData
): Promise<CreateBodyTypeResponse> => {
	const json = createBodyTypeSchema.parse(
		Object.fromEntries(formData)
	);
	const bodyType = await postRequest('body-type', json);
	return createBodyTypeResponseSchema.parse(bodyType);
};