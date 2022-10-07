import { z } from 'zod';

import {
	createFavoriteResponseSchema,
	createFavoriteSchema,
	deleteFavoriteResponseSchema,
	favoriteModelSchema,
} from 'schemas/favorite';

import { deleteRequest, getRequest, postRequest } from 'helpers/api';
import { mongoIdSchema } from 'schemas/mongo';

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
	id: any
) => {
	const _id = mongoIdSchema.parse(id);
	const favorite = await deleteRequest(`favorite/${_id}`);
	return deleteFavoriteResponseSchema.parse(favorite);
};
