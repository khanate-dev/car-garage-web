import { z } from 'zod';

import { getRequest } from 'helpers/api';
import { bodyTypeModelSchema } from 'schemas/body-type';


export const loadBodyTypes = async () => {
	const bodyTypes = await getRequest('body-type');
	return z.array(bodyTypeModelSchema).parse(bodyTypes);
};
