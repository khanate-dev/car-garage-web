import { ActionFunction } from 'react-router-dom';

import { updateProduct } from 'endpoints/product';

import { getActionError } from 'helpers/route';
import { getSetting } from 'helpers/settings';

export const productsBuyAction: ActionFunction = async ({
	params,
	request,
}) => {
	try {
		const buyerId = getSetting('user')?._id;
		if (!buyerId) {
			throw new Error('user not found');
		}
		const formData = await request.formData();
		formData.append('buyerId', buyerId);
		await updateProduct(params.productId, formData);
		return null;
	}
	catch (error: any) {
		return getActionError({
			source: 'products-view',
			error,
		});
	}
};
