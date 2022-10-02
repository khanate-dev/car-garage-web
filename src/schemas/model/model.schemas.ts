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
	makeType: z.object({
		name: z.string(),
	}),
});

export type ModelSansMeta = z.infer<typeof modelSansMetaModelSchema>;

export type Model = z.infer<typeof modelModelSchema>;
