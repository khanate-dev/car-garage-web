import { z } from 'zod';

import { makeTypeModelSchema } from 'schemas/make-type';

import { getRequest } from 'helpers/api';

export const getMakeTypes = async () => {
	const makeTypes = await getRequest('make-type');
	return z.array(makeTypeModelSchema).parse(makeTypes);
};
