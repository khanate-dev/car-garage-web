import { z } from 'zod';

import { bodyTypeModelSchema } from 'schemas/body-type';

import { getRequest } from 'helpers/api';

export const getBodyTypes = async () => {
	const bodyTypes = await getRequest('body-type');
	return z.array(bodyTypeModelSchema).parse(bodyTypes);
};
