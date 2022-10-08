import { z } from 'zod';

import {
	makeTypeModelSchema,
	makeTypeRequestSchema,
	makeTypeResponseSchema,
} from 'schemas/make-type';

import {
	getRequest,
	postRequest,
	putRequest,
} from 'helpers/api';
import { mongoIdSchema } from 'schemas/mongo';

export const getMakeTypes = async () => {
	const makeTypes = await getRequest('make-type');
	return z.array(makeTypeModelSchema).parse(makeTypes);
};

export const getMakeType = async (
	id: any
) => {
	const _id = mongoIdSchema.parse(id);
	const makeType = await getRequest(`make-type/${_id}`);
	return makeTypeModelSchema.parse(makeType);
};

export const createMakeType = async (
	formData: FormData
) => {
	const json = makeTypeRequestSchema.parse(
		Object.fromEntries(formData)
	);
	const response = await postRequest('make-type', json);
	return makeTypeResponseSchema.parse(response);
};

export const updateMakeType = async (
	id: any,
	formData: FormData
) => {
	const _id = mongoIdSchema.parse(id);
	const json = makeTypeRequestSchema.parse(
		Object.fromEntries(formData)
	);
	const response = await putRequest(`make-type/${_id}`, json);
	return makeTypeResponseSchema.parse(response);
};
