import { z } from 'zod';

import {
	Product,
	productModelSchema,
	createProductSchema,
} from 'schemas/product';
import { uploadImage } from 'endpoints/imgur';

import { getRequest, postRequest } from 'helpers/api';
import { getSetting } from 'helpers/settings';

export const getProducts = async (): Promise<Product[]> => {
	const products = await getRequest('product');
	return z.array(productModelSchema).parse(products);
};

export const createProduct = async (
	formData: FormData
): Promise<Product> => {

	const image = formData.get('image');
	if (!(image instanceof File)) {
		throw new Error('Image must be a valid file');
	}
	const imageUrl = await uploadImage(image);

	const json = createProductSchema.parse({
		...Object.fromEntries(formData),
		sellerId: getSetting('user')?._id,
		image: imageUrl,
	});
	const response = await postRequest('product', json);
	return productModelSchema.parse(response);
};