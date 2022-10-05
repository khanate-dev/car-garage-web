import { z } from 'zod';

import {
	createFavoriteSchema,
	Favorite,
	favoriteModelSchema,
} from 'schemas/favorite';

import { getRequest, postRequest } from 'helpers/api';

export const getFavorites = async (): Promise<Favorite[]> => {
	const response = await getRequest('favorite');
	return z.array(favoriteModelSchema).parse(response);
};

export const createFavorite = async (
	formData: FormData
): Promise<Favorite> => {
	const json = createFavoriteSchema.parse(Object.fromEntries(formData));
	const favorite = await postRequest('favorite', json);
	return favoriteModelSchema.parse(favorite);
};