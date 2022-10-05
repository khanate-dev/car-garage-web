import z from 'zod';

import { getModelSchema } from 'helpers/schema';
import { mongoIdSchema } from 'schemas/mongo';

export const {
	sansMetaModelSchema: favoriteSansMetaModelSchema,
	modelSchema: favoriteModelSchema,
} = getModelSchema({
	rating: z.number().min(1).max(5),
	description: z.string().optional(),
	userId: mongoIdSchema,
	bodyTypeId: mongoIdSchema,
});

export type FavoriteSansMeta = z.infer<typeof favoriteSansMetaModelSchema>;

export type Favorite = z.infer<typeof favoriteModelSchema>;

export const createFavoriteSchema = favoriteSansMetaModelSchema.pick({
	bodyTypeId: true,
});