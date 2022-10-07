import z from 'zod';

import { mongoIdSchema } from 'schemas/mongo';
import { makeTypeSansMetaModelSchema } from 'schemas/make-type';

import { getModelSchema } from 'helpers/schema';

export const {
	sansMetaModelSchema: modelSansMetaModelSchema,
	modelSchema: modelModelSchema,
} = getModelSchema({
	name: z.string(),
	year: z.number().positive(),
	makeTypeId: mongoIdSchema,
	makeType: makeTypeSansMetaModelSchema,
});

export type ModelSansMeta = z.infer<typeof modelSansMetaModelSchema>;

export type Model = z.infer<typeof modelModelSchema>;

export const createModelSchema = modelSansMetaModelSchema
	.omit({ makeType: true })
	.extend({
		year: z.preprocess(
			(value) => parseInt(z.string().parse(value)),
			z.number().positive()
		),
	});

export type CreateModel = z.infer<typeof createModelSchema>;

export const createModelResponseSchema = modelModelSchema.omit({ makeType: true });

export type CreateModelResponse = z.infer<typeof createModelResponseSchema>;
