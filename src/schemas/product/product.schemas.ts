import z from 'zod';

import { getModelSchema } from 'helpers/schema';

export const {
	sansMetaModelSchema: productSansMetaModelSchema,
	modelSchema: productModelSchema,
} = getModelSchema({
	user: z.string(),
	title: z.string(),
	description: z.string(),
	price: z.number().positive(),
	image: z.string().url(),
});

export type ProductSansMeta = z.infer<typeof productSansMetaModelSchema>;

export type Product = z.infer<typeof productModelSchema>;