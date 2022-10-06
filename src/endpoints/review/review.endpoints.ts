import { z } from 'zod';

import {
	CreateReviewResponse,
	createReviewResponseSchema,
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
): Promise<CreateReviewResponse> => {
	const json = createReviewSchema.parse(Object.fromEntries(formData));
	const favorite = await postRequest('review', json);
	return createReviewResponseSchema.parse(favorite);
};