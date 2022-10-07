import { z } from 'zod';

import {
	BodyType,
	bodyTypeModelSchema,
	BodyTypeResponse,
	bodyTypeResponseSchema,
	bodyTypeRequestSchema,
} from 'schemas/body-type';
import { mongoIdSchema } from 'schemas/mongo';

import {
	getRequest,
	postRequest,
	putRequest,
} from 'helpers/api';

export const getBodyTypes = async (): Promise<BodyType[]> => {
	const bodyTypes = await getRequest('body-type');
	return z.array(bodyTypeModelSchema).parse(bodyTypes);
};

export const getBodyType = async (
	id: any
): Promise<BodyType> => {
	const _id = mongoIdSchema.parse(id);
	const bodyType = await getRequest(`body-type/${_id}`);
	return bodyTypeModelSchema.parse(bodyType);
};

export const createBodyType = async (
	formData: FormData
): Promise<BodyTypeResponse> => {
	const json = bodyTypeRequestSchema.parse(
		Object.fromEntries(formData)
	);
	const bodyType = await postRequest('body-type', json);
	return bodyTypeResponseSchema.parse(bodyType);
};

export const putBodyType = async (
	id: any,
	formData: FormData
): Promise<BodyTypeResponse> => {
	const _id = mongoIdSchema.parse(id);
	const json = bodyTypeRequestSchema.parse(
		Object.fromEntries(formData)
	);
	const bodyType = await putRequest(`body-type/${_id}`, json);
	return bodyTypeResponseSchema.parse(bodyType);
};
