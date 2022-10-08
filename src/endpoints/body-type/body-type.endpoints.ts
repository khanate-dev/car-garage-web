import { z } from 'zod';

import {
	bodyTypeModelSchema,
	bodyTypeResponseSchema,
	bodyTypeRequestSchema,
} from 'schemas/body-type';
import { mongoIdSchema } from 'schemas/mongo';

import {
	getRequest,
	postRequest,
	putRequest,
} from 'helpers/api';

export const getBodyTypes = async () => {
	const bodyTypes = await getRequest('body-type');
	return z.array(bodyTypeModelSchema).parse(bodyTypes);
};

export const getBodyType = async (
	id: any
) => {
	const _id = mongoIdSchema.parse(id);
	const bodyType = await getRequest(`body-type/${_id}`);
	return bodyTypeModelSchema.parse(bodyType);
};

export const createBodyType = async (
	formData: FormData
) => {
	const json = bodyTypeRequestSchema.parse(
		Object.fromEntries(formData)
	);
	const bodyType = await postRequest('body-type', json);
	return bodyTypeResponseSchema.parse(bodyType);
};

export const updateBodyType = async (
	id: any,
	formData: FormData
) => {
	const _id = mongoIdSchema.parse(id);
	const json = bodyTypeRequestSchema.parse(
		Object.fromEntries(formData)
	);
	const bodyType = await putRequest(`body-type/${_id}`, json);
	return bodyTypeResponseSchema.parse(bodyType);
};
