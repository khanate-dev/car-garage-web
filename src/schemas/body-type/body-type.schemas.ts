import z from 'zod';

import { getModelSchema } from 'helpers/schema';
import { mongoIdSchema } from 'schemas/mongo';

export const {
	sansMetaModelSchema: bodyTypeSansMetaModelSchema,
	modelSchema: bodyTypeModelSchema,
} = getModelSchema({
	name: z.string(),
	modelId: mongoIdSchema,
	model: z.strictObject({
		name: z.string(),
		year: z.number().positive(),
		makeTypeId: mongoIdSchema,
		makeType: z.strictObject({
			name: z.string(),
		}),
	}),
});

export const createBodyTypeSchema = bodyTypeSansMetaModelSchema.omit({
	model: true,
});

export type BodyTypeSansMeta = z.infer<typeof bodyTypeSansMetaModelSchema>;

export type BodyType = z.infer<typeof bodyTypeModelSchema>;