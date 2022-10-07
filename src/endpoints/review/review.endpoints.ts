import { z } from 'zod';

import {
	ReviewResponse,
	reviewResponseSchema,
	reviewRequestSchema,
	Review,
	reviewModelSchema,
} from 'schemas/review';

import { getRequest, postRequest, putRequest } from 'helpers/api';
import { mongoIdSchema } from 'schemas/mongo';

export const getReviews = async (): Promise<Review[]> => {
	const response = await getRequest('review');
	return z.array(reviewModelSchema).parse(response);
};

export const getReview = async (
	id: any
): Promise<Review> => {
	const _id = mongoIdSchema.parse(id);
	const response = await getRequest(`review/${_id}`);
	return reviewModelSchema.parse(response);
};

export const createReview = async (
	formData: FormData
): Promise<ReviewResponse> => {
	const json = reviewRequestSchema.parse(Object.fromEntries(formData));
	const favorite = await postRequest('review', json);
	return reviewResponseSchema.parse(favorite);
};

export const putReview = async (
	id: any,
	formData: FormData
): Promise<ReviewResponse> => {
	const _id = mongoIdSchema.parse(id);
	const json = reviewRequestSchema.parse(Object.fromEntries(formData));
	const favorite = await putRequest(`review/${_id}`, json);
	return reviewResponseSchema.parse(favorite);
};
