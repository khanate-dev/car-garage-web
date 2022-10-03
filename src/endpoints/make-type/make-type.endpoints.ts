import { z } from 'zod';

import {
	MakeType,
	makeTypeModelSchema,
	makeTypeSansMetaModelSchema,
} from 'schemas/make-type';

import { getRequest, postRequest } from 'helpers/api';

export const getMakeTypes = async () => {
	const makeTypes = await getRequest('make-type');
	return z.array(makeTypeModelSchema).parse(makeTypes);
};

export const createMakeType = async (
	formData: FormData
): Promise<MakeType> => {
	const body = makeTypeSansMetaModelSchema.parse(Object.fromEntries(formData));
	const response = await postRequest('make-type', body);
	return makeTypeModelSchema.parse(response);
};