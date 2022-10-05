import { z } from 'zod';

import {
	createReviewSchema,
	Review,
	reviewModelSchema,
} from 'schemas/review';

import { getRequest, postRequest } from 'helpers/api';

export const getReviews = async (): Promise<Review[]> => {
	const response = await getRequest('review');
	return z.array(reviewModelSchema).parse(response);
};

export const createReview = async (
	formData: FormData
): Promise<Review> => {
	const json = createReviewSchema.parse(Object.fromEntries(formData));
	const favorite = await postRequest('favorite', json);
	return reviewModelSchema.parse(favorite);
};