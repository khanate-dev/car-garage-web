import { z } from 'zod';

import { MONGO_ID_REGEX } from 'config';

export const mongoIdSchema = z.string().regex(MONGO_ID_REGEX);