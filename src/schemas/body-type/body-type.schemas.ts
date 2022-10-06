import z from 'zod';

import { mongoIdSchema } from 'schemas/mongo';
import { modelSansMetaModelSchema } from 'schemas/model';

import { getModelSchema } from 'helpers/schema';

export const {
	sansMetaModelSchema: bodyTypeSansMetaModelSchema,
	modelSchema: bodyTypeModelSchema,
} = getModelSchema({
	name: z.string(),
	modelId: mongoIdSchema,
	model: modelSansMetaModelSchema,
});

export type BodyTypeSansMeta = z.infer<typeof bodyTypeSansMetaModelSchema>;

export type BodyType = z.infer<typeof bodyTypeModelSchema>;

export const createBodyTypeSchema = bodyTypeSansMetaModelSchema.omit({
	model: true,
});

export type CreateBodyType = z.infer<typeof createBodyTypeSchema>;

export const createBodyTypeResponseSchema = bodyTypeModelSchema.omit({ model: true });

export type CreateBodyTypeResponse = z.infer<typeof createBodyTypeResponseSchema>;