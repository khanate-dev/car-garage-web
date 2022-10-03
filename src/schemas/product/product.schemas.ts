import z from 'zod';

import { mongoIdSchema } from 'schemas/mongo';

import { getModelSchema } from 'helpers/schema';

import { ThemeColor } from 'types/general';

export const productCategories = [
	'car',
	'bike',
	'auto-parts',
] as const;

export type ProductCategory = typeof productCategories[number];

export const productCategoryColors: Record<
	ProductCategory,
	ThemeColor
> = {
	car: 'danger',
	bike: 'info',
	'auto-parts': 'success',
};

export const {
	sansMetaModelSchema: productSansMetaModelSchema,
	modelSchema: productModelSchema,
} = getModelSchema({
	title: z.string(),
	description: z.string().optional(),
	minPrice: z.number().positive(),
	maxPrice: z.number().positive(),
	image: z.string().url().optional(),
	isFeatured: z.boolean().optional(),
	category: z.enum(productCategories),
	buyerId: mongoIdSchema.optional(),
	sellerId: mongoIdSchema,
	makeTypeId: mongoIdSchema,
	modelId: mongoIdSchema.optional(),
	bodyTypeId: mongoIdSchema.optional(),

});

export type ProductSansMeta = z.infer<typeof productSansMetaModelSchema>;

export type Product = z.infer<typeof productModelSchema>;