import z from 'zod';

import { getModelSchema } from 'helpers/schema';
import { mongoIdSchema } from 'schemas/mongo';

export const {
  sansMetaModelSchema: modelSansMetaModelSchema,
  modelSchema: modelModelSchema,
} = getModelSchema({
  name: z.string(),
  year: z.number().positive(),
  makeTypeId: mongoIdSchema,
});

export type MakeTypeSansMeta = z.infer<typeof modelSansMetaModelSchema>;

export type MakeType = z.infer<typeof modelModelSchema>;
