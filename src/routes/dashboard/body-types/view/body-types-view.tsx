import {
	ActionFunction,
	LoaderFunction,
	useFetcher,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';

import { BodyType } from 'schemas/body-type';
import { Favorite } from 'schemas/favorite';
import { Review } from 'schemas/review';
import { getBodyTypes } from 'endpoints/body-type';
import { getReviews } from 'endpoints/review';
import {
	createFavorite,
	deleteFavorite,
	getFavorites,
} from 'endpoints/favorite';

import { humanizeString } from 'helpers/string';
import { getActionError } from 'helpers/route';

import Page from 'components/Page';
import Card, { CardProps } from 'components/Card';
import Rating from 'components/Rating';

import styles from './body-types-view.module.scss';

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

export const bodyTypesFavoriteAction: ActionFunction = async ({ params, request }) => {
	try {
		if (typeof params.bodyTypeId !== 'string') {
			throw new Error('Require Body Type Id');
		}
		const isDelete = request.method === 'DELETE';
		const formData = await request.formData();
		if (isDelete) {
			await deleteFavorite(formData);
		}
		else {
			formData.append('bodyTypeId', params.bodyTypeId);
			await createFavorite(formData);
		}
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
	const navigate = useNavigate();

	return (
		<Page
			title='Body Types'
			isEmpty={bodyTypes.length === 0}
			hasAdd
			isGridView
		>
			{bodyTypes.map(({ _id, name, model }) => {

				const favorite = favorites.find(row => row.bodyTypeId === _id);
				const review = reviews.find(row => row.bodyTypeId === _id);

				const actions: CardProps['actions'] = [{
					text: 'Favorite',
					icon: favorite ? 'starFilled' : 'star',
					color: 'warning',
					onClick: () => {
						const form = (
							favorite
								? { _id: favorite._id }
								: null
						);
						fetcher.submit(form, {
							action: `/body-types/favorite/${_id}`,
							method: favorite ? 'delete' : 'post',
						});
					},
					isLoading: (
						fetcher.state !== 'idle'
						&& fetcher.formAction === `/body-types/favorite/${_id}`
					),
				}];
				if (!review) {
					actions.push({
						text: 'Review',
						icon: 'review',
						onClick: () => navigate(`review/${_id}`),
					});
				}

				const subtitle = (
					review
						? <Rating
							className={styles['rating']}
							rating={review.rating}
						/>
						: undefined
				);

				return (
					<Card
						key={_id}
						icon={favorite ? 'starFilled' : undefined}
						title={name}
						subtitle={subtitle}
						description={review ? review.description : undefined}
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
						actions={actions}
					/>
				);
			})}
		</Page>
	);

};