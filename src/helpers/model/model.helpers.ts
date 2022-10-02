import { z } from 'zod';

import { getRequest } from 'helpers/api';
import { modelModelSchema } from 'schemas/model';


export const loadModels = async () => {
	const models = await getRequest('model');
	return z.array(modelModelSchema).parse(models);
};
