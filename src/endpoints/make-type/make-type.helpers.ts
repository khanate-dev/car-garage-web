import { z } from 'zod';

import { getRequest } from 'helpers/api';
import { makeTypeModelSchema } from 'schemas/make-type';


export const loadMakeTypes = async () => {
	const makeTypes = await getRequest('make-type');
	return z.array(makeTypeModelSchema).parse(makeTypes);
};
