import { ActionFunction } from 'react-router-dom';

import { deleteProduct } from 'endpoints/product';

import { getActionError } from 'helpers/route';

export const productsDeleteAction: ActionFunction = async ({
	params,
}) => {
	try {
		await deleteProduct(params.productId);
		return null;
	}
	catch (error: any) {
		return getActionError({
			source: 'products-view',
			error,
		});
	}
};
