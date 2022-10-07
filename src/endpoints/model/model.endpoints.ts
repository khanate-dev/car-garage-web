import { z } from 'zod';

import {
	CreateModelResponse,
	createModelResponseSchema,
	createModelSchema,
	modelModelSchema,
} from 'schemas/model';

import { getRequest, postRequest } from 'helpers/api';

export const getModels = async () => {
	const models = await getRequest('model');
	return z.array(modelModelSchema).parse(models);
};

export const createModel = async (
	formData: FormData
): Promise<CreateModelResponse> => {
	const json = createModelSchema.parse(
		Object.fromEntries(formData)
	);
	const model = await postRequest('model', json);
	return createModelResponseSchema.parse(model);
};
