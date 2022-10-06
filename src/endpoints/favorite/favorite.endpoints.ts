import { z } from 'zod';

import {
	createFavoriteResponseSchema,
	createFavoriteSchema,
	deleteFavoriteResponseSchema,
	deleteFavoriteSchema,
	favoriteModelSchema,
} from 'schemas/favorite';

import { deleteRequest, getRequest, postRequest } from 'helpers/api';

export const getFavorites = async () => {
	const response = await getRequest('favorite');
	return z.array(favoriteModelSchema).parse(response);
};

export const createFavorite = async (
	formData: FormData
) => {
	const json = createFavoriteSchema.parse(
		Object.fromEntries(formData)
	);
	const favorite = await postRequest('favorite', json);
	return createFavoriteResponseSchema.parse(favorite);
};

export const deleteFavorite = async (
	formData: FormData
) => {
	const json = deleteFavoriteSchema.parse(
		Object.fromEntries(formData)
	);
	const favorite = await deleteRequest(`favorite/${json._id}`);
	return deleteFavoriteResponseSchema.parse(favorite);
};