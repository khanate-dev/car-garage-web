import { ActionFunction } from 'react-router-dom';

import { deleteFavorite } from 'endpoints/favorite';

import { getActionError } from 'helpers/route';

export const favoriteDeleteAction: ActionFunction = async ({ params }) => {
	try {
		await deleteFavorite(params.favoriteId);
		return null;
	}
	catch (error: any) {
		return getActionError({
			source: 'body-types-view',
			error,
		});
	}
};
