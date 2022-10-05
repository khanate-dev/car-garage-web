import z from 'zod';

import { getModelSchema } from 'helpers/schema';
import { mongoIdSchema } from 'schemas/mongo';

export const {
	sansMetaModelSchema: reviewSansMetaModelSchema,
	modelSchema: reviewModelSchema,
} = getModelSchema({
	userId: mongoIdSchema,
	bodyTypeId: mongoIdSchema,
});

export type ReviewSansMeta = z.infer<typeof reviewSansMetaModelSchema>;

export type Review = z.infer<typeof reviewModelSchema>;

export const createReviewSchema = reviewSansMetaModelSchema.pick({
	bodyTypeId: true,
});