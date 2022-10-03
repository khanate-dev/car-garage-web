import { z } from 'zod';

import { modelModelSchema } from 'schemas/model';

import { getRequest } from 'helpers/api';

export const fetchModels = async () => {
	const models = await getRequest('model');
	return z.array(modelModelSchema).parse(models);
};