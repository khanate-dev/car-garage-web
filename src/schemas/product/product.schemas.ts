import z from 'zod';

import { mongoIdSchema } from 'schemas/mongo';

import { getModelSchema } from 'helpers/schema';

import { ThemeColor } from 'types/general';
import { userSansMetaModelSchema } from 'schemas/user';
import { makeTypeSansMetaModelSchema } from 'schemas/make-type';
import { modelSansMetaModelSchema } from 'schemas/model';
import { bodyTypeSansMetaModelSchema } from 'schemas/body-type';

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
	buyer: userSansMetaModelSchema.omit({ password: true }).nullable(),
	sellerId: mongoIdSchema,
	seller: userSansMetaModelSchema.omit({ password: true }).nullable(),
	makeTypeId: mongoIdSchema,
	makeType: makeTypeSansMetaModelSchema,
	modelId: mongoIdSchema.optional(),
	model: modelSansMetaModelSchema.nullable(),
	bodyTypeId: mongoIdSchema.optional(),
	bodyType: bodyTypeSansMetaModelSchema.nullable(),
});

export type ProductSansMeta = z.infer<typeof productSansMetaModelSchema>;

export type Product = z.infer<typeof productModelSchema>;

export const createProductSchema = productSansMetaModelSchema
	.omit({
		buyerId: true,
		buyer: true,
		seller: true,
		makeType: true,
		model: true,
		bodyType: true,
	})
	.extend({
		minPrice: z.preprocess(
			(value) => parseInt(z.string().parse(value)),
			z.number().positive()
		),
		maxPrice: z.preprocess(
			(value) => parseInt(z.string().parse(value)),
			z.number().positive()
		),
		image: z.instanceof(File),
		modelId: z.preprocess(
			(value) => value === '' ? undefined : value,
			mongoIdSchema.optional()
		),
		bodyTypeId: z.preprocess(
			(value) => value === '' ? undefined : value,
			mongoIdSchema.optional()
		),
	})
	.refine(
		({ minPrice, maxPrice }) => maxPrice >= minPrice,
		'Maximum price must be bigger than or equal to minimum'
	);

export type CreateProduct = z.infer<typeof createProductSchema>;

export const createProductResponseSchema = productModelSchema.omit({
	buyer: true,
	seller: true,
	makeType: true,
	model: true,
	bodyType: true,
});

export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;
