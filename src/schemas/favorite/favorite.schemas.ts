import z from 'zod';

import { getModelSchema } from 'helpers/schema';
import { mongoIdSchema } from 'schemas/mongo';
import { bodyTypeSansMetaModelSchema } from 'schemas/body-type';

export const {
	sansMetaModelSchema: favoriteSansMetaModelSchema,
	modelSchema: favoriteModelSchema,
} = getModelSchema({
	userId: mongoIdSchema,
	bodyTypeId: mongoIdSchema,
	bodyType: bodyTypeSansMetaModelSchema,
});

export type FavoriteSansMeta = z.infer<typeof favoriteSansMetaModelSchema>;

export type Favorite = z.infer<typeof favoriteModelSchema>;

export const createFavoriteSchema = favoriteSansMetaModelSchema.pick({
	bodyTypeId: true,
});

export const createFavoriteResponseSchema = favoriteModelSchema.omit({
	bodyType: true,
});

export const deleteFavoriteSchema = z.strictObject({
	_id: mongoIdSchema,
});

export const deleteFavoriteResponseSchema = favoriteModelSchema.omit({
	bodyType: true,
});