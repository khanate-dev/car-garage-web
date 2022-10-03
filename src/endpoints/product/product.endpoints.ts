import { z } from 'zod';

import {
	Product,
	productModelSchema,
	createProductSchema,
} from 'schemas/product';

import { getRequest, postRequest } from 'helpers/api';
import { getSetting } from 'helpers/settings';

export const getProducts = async (): Promise<Product[]> => {
	const products = await getRequest('product');
	return z.array(productModelSchema).parse(products);
};

export const createProduct = async (
	formData: FormData
): Promise<Product> => {
	const json = createProductSchema.parse({
		...Object.fromEntries(formData),
		sellerId: getSetting('user')?._id,
	});
	const response = await postRequest('product', json, true);
	return productModelSchema.parse(response);
};