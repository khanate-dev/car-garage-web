import { z } from 'zod';

import {
	modelResponseSchema,
	modelRequestSchema,
	modelModelSchema,
} from 'schemas/model';
import { mongoIdSchema } from 'schemas/mongo';

import {
	getRequest,
	postRequest,
	putRequest,
} from 'helpers/api';

export const getModels = async () => {
	const models = await getRequest('model');
	return z.array(modelModelSchema).parse(models);
};

export const getModel = async (
	id: any
) => {
	const _id = mongoIdSchema.parse(id);
	const model = await getRequest(`model/${_id}`);
	return modelModelSchema.parse(model);
};

export const createModel = async (
	formData: FormData
) => {
	const json = modelRequestSchema.parse(
		Object.fromEntries(formData)
	);
	const model = await postRequest('model', json);
	return modelResponseSchema.parse(model);
};

export const updateModel = async (
	id: any,
	formData: FormData
) => {
	const _id = mongoIdSchema.parse(id);
	const json = modelRequestSchema.parse(
		Object.fromEntries(formData)
	);
	const model = await putRequest(`model/${_id}`, json);
	return modelResponseSchema.parse(model);
};
