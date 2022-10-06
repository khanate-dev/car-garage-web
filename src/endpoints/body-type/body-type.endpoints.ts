import { z } from 'zod';

import {
	BodyType,
	bodyTypeModelSchema,
	CreateBodyTypeResponse,
	createBodyTypeResponseSchema,
	createBodyTypeSchema,
} from 'schemas/body-type';

import { getRequest, postRequest } from 'helpers/api';
import { mongoIdSchema } from 'schemas/mongo';

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
): Promise<CreateBodyTypeResponse> => {
	const json = createBodyTypeSchema.parse(
		Object.fromEntries(formData)
	);
	const bodyType = await postRequest('body-type', json);
	return createBodyTypeResponseSchema.parse(bodyType);
};