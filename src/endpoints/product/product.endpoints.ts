import { z } from 'zod';

import {
	productModelSchema,
	productRequestSchema,
	productResponseSchema,
} from 'schemas/product';

import { deleteRequest, getRequest, postRequest, putRequest } from 'helpers/api';
import { getSetting } from 'helpers/settings';
import { mongoIdSchema } from 'schemas/mongo';

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

	const multipartForm = new FormData();
	for (const key in json) {
		const value = json[key as keyof typeof json];
		if (!value) continue;
		multipartForm.append(
			key,
			!(value instanceof File) ? value.toString() : value
		);
	}

	const response = await postRequest('product', multipartForm);
	return productResponseSchema.parse(response);
};

export const updateProduct = async (
	id: any,
	formData: FormData
) => {
	const _id = mongoIdSchema.parse(id);
	const json = productRequestSchema.parse({
		...Object.fromEntries(formData),
		sellerId: getSetting('user')?._id,
	});

	const multipartForm = new FormData();
	for (const key in json) {
		const value = json[key as keyof typeof json];
		if (value === undefined) continue;
		multipartForm.append(
			key,
			!(value instanceof File) ? value.toString() : value
		);
	}

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
