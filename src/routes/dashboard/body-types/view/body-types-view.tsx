import {
	ActionFunction,
	LoaderFunction,
	useFetcher,
	useLoaderData,
} from 'react-router-dom';

import { BodyType } from 'schemas/body-type';
import { Favorite } from 'schemas/favorite';
import { Review } from 'schemas/review';
import { getBodyTypes } from 'endpoints/body-type';
import { getReviews } from 'endpoints/review';
import { createFavorite, getFavorites } from 'endpoints/favorite';

import { humanizeString } from 'helpers/string';
import { getActionError } from 'helpers/route';

import Page from 'components/Page';
import Card from 'components/Card';

interface LoaderData {
	bodyTypes: BodyType[],
	favorites: Favorite[],
	reviews: Review[],
}

export const bodyTypesViewLoader: LoaderFunction = async (): Promise<LoaderData> => {
	const bodyTypes = await getBodyTypes();
	const favorites = await getFavorites();
	const reviews = await getReviews();
	return {
		bodyTypes,
		favorites,
		reviews,
	};
};

export const bodyTypesFavoriteAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		await createFavorite(formData);
		return null;
	}
	catch (error: any) {
		return getActionError({
			source: 'body-types-favorite',
			error,
		});
	}
};

export const BodyTypesView = () => {

	const { bodyTypes, favorites, reviews } = useLoaderData() as LoaderData;
	const fetcher = useFetcher();

	return (
		<Page
			title='Body Types'
			isEmpty={bodyTypes.length === 0}
			hasAdd
			isGridView
		>
			{bodyTypes.map(({ _id, name, model }) => {

				const isFavorite = favorites.some(row => row.bodyTypeId === _id);
				const isReviewed = favorites.some(row => row.bodyTypeId === _id);

				return (
					<Card
						key={_id}
						title={name}
						labels={[
							{
								title: `Model: ${`${model.year} ${model.name}`}`,
								color: 'danger',
							},
							{
								title: `Make Type: ${humanizeString(model.makeType.name)}`,
								color: 'success',
							},
						]}
						actions={[
							{
								text: 'Favorite',
								icon: isFavorite ? 'starFilled' : 'star',
								color: 'warning',
								onClick: () => {
									if (isFavorite) {
										return fetcher.submit(null, {
											action: '/favorite',
											method: 'delete',
										});
									}
									const form = new FormData();
									form.append('bodyTypeId', _id);
									fetcher.submit(form, {
										action: '/favorite',
										method: 'post',
									});
								},
							},
							{
								text: 'Review',
								icon: 'review',
							},
						]}
					/>
				);
			})}
		</Page>
	);

};
