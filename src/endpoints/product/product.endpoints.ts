import { z } from 'zod';

import {
	productModelSchema,
	productRequestSchema,
	productResponseSchema,
	productUpdateRequestSchema,
} from 'schemas/product';
import { mongoIdSchema } from 'schemas/mongo';

import { getSetting } from 'helpers/settings';
import { objectToFormData } from 'helpers/form';
import {
	deleteRequest,
	getRequest,
	postRequest,
	putRequest,
} from 'helpers/api';

export const getProducts = async () => {
	const products = await getRequest('product');
	return z.array(productModelSchema).parse(products);
};

export const getProduct = async (
	id: any
) => {
	const _id = mongoIdSchema.parse(id);
	const product = await getRequest(`product/${_id}`);
	return productModelSchema.parse(product);
};

export const createProduct = async (
	formData: FormData
) => {
	const json = productRequestSchema.parse({
		...Object.fromEntries(formData),
		sellerId: getSetting('user')?._id,
	});
	const multipartForm = objectToFormData(json);
	const response = await postRequest('product', multipartForm);
	return productResponseSchema.parse(response);
};

export const updateProduct = async (
	id: any,
	formData: FormData
) => {
	const _id = mongoIdSchema.parse(id);
	const json = productUpdateRequestSchema.parse(
		Object.fromEntries(formData)
	);
	const multipartForm = objectToFormData(json);
	const response = await putRequest(`product/${_id}`, multipartForm);
	return productResponseSchema.parse(response);
};

export const deleteProduct = async (
	id: any
) => {
	const _id = mongoIdSchema.parse(id);
	const response = await deleteRequest(`product/${_id}`);
	return productResponseSchema.parse(response);
};
