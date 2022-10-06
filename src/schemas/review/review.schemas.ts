import z from 'zod';

import { mongoIdSchema } from 'schemas/mongo';
import { bodyTypeSansMetaModelSchema } from 'schemas/body-type';

import { getModelSchema } from 'helpers/schema';

import { Rating } from 'types/general';

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

export const createReviewSchema = reviewSansMetaModelSchema.extend({
	rating: z.preprocess(
		(value) => parseInt(z.string().parse(value)),
		z.nativeEnum(Rating)
	),
}).omit({
	userId: true,
	bodyType: true,
});

export type CreateReview = z.infer<typeof createReviewSchema>;

export const createReviewResponseSchema = reviewModelSchema.omit({
	bodyType: true,
});

export type CreateReviewResponse = z.infer<typeof createReviewResponseSchema>;