import { z } from 'zod';

import {
	reviewResponseSchema,
	reviewRequestSchema,
	reviewModelSchema,
} from 'schemas/review';
import { mongoIdSchema } from 'schemas/mongo';

import { getRequest, postRequest, putRequest } from 'helpers/api';

export const getReviews = async () => {
	const response = await getRequest('review');
	return z.array(reviewModelSchema).parse(response);
};

export const getReview = async (
	id: any
) => {
	const _id = mongoIdSchema.parse(id);
	const response = await getRequest(`review/${_id}`);
	return reviewModelSchema.parse(response);
};

export const createReview = async (
	formData: FormData
) => {
	const json = reviewRequestSchema.parse(Object.fromEntries(formData));
	const favorite = await postRequest('review', json);
	return reviewResponseSchema.parse(favorite);
};

export const updateReview = async (
	id: any,
	formData: FormData
) => {
	const _id = mongoIdSchema.parse(id);
	const json = reviewRequestSchema.parse(Object.fromEntries(formData));
	const favorite = await putRequest(`review/${_id}`, json);
	return reviewResponseSchema.parse(favorite);
};
