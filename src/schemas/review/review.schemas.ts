import z from 'zod';

import { mongoIdSchema } from 'schemas/mongo';
import { bodyTypeSansMetaModelSchema } from 'schemas/body-type';

import { getModelSchema } from 'helpers/schema';

import { FormField, Rating } from 'types/general';

export const {
	sansMetaModelSchema: reviewSansMetaModelSchema,
	modelSchema: reviewModelSchema,
} = getModelSchema({
	rating: z.nativeEnum(Rating),
	description: z.string().optional(),
	userId: mongoIdSchema,
	bodyTypeId: mongoIdSchema,
	bodyType: bodyTypeSansMetaModelSchema,

});

export type ReviewSansMeta = z.infer<typeof reviewSansMetaModelSchema>;

export type Review = z.infer<typeof reviewModelSchema>;

export const reviewRequestSchema = reviewSansMetaModelSchema.extend({
	rating: z.preprocess(
		(value) => parseInt(z.string().parse(value)),
		z.nativeEnum(Rating)
	),
}).omit({
	userId: true,
	bodyType: true,
});

export type ReviewRequest = z.infer<typeof reviewRequestSchema>;

export const reviewResponseSchema = reviewModelSchema.omit({
	bodyType: true,
});

export type ReviewResponse = z.infer<typeof reviewResponseSchema>;

export type ReviewForm = Omit<ReviewRequest, 'bodyTypeId'>;

export const reviewFormFields: FormField<ReviewForm>[] = [
	{
		name: 'rating',
		fieldType: 'rating',
		required: true,
		interactive: true,
	},
	{
		name: 'description',
		fieldType: 'textarea',
	},
];
