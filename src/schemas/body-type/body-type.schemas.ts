import z from 'zod';

import { getModelSchema } from 'helpers/schema';
import { mongoIdSchema } from 'schemas/mongo';

export const {
  sansMetaModelSchema: bodyTypeSansMetaModelSchema,
  modelSchema: bodyTypeModelSchema,
} = getModelSchema({
  name: z.string(),
  modelId: mongoIdSchema,
});

export type MakeTypeSansMeta = z.infer<typeof bodyTypeSansMetaModelSchema>;

export type MakeType = z.infer<typeof bodyTypeModelSchema>;
