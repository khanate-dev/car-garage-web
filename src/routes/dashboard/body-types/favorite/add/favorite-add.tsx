import { ActionFunction } from 'react-router-dom';

import { createFavorite } from 'endpoints/favorite';

import { getActionError } from 'helpers/route';

export const favoriteAddAction: ActionFunction = async ({ params }) => {
	try {
		const formData = new FormData();
		formData.append('bodyTypeId', params.bodyTypeId ?? '');
		await createFavorite(formData);
		return null;
	}
	catch (error: any) {
		return getActionError({
			source: 'body-types-view',
			error,
		});
	}
};
