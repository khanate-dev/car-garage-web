import { useState } from 'react';
import {
	LoaderFunction,
	useFetcher,
	useLoaderData,
	useNavigate,
	useNavigation,
} from 'react-router-dom';

import { BodyType } from 'schemas/body-type';
import { Favorite } from 'schemas/favorite';
import { Review } from 'schemas/review';
import { getBodyTypes } from 'endpoints/body-type';
import { getReviews } from 'endpoints/review';
import { getFavorites } from 'endpoints/favorite';

import { humanizeToken } from 'helpers/string';
import { getSetting } from 'helpers/settings';

import Page from 'components/Page';
import Card, { CardProps } from 'components/Card';
import Rating from 'components/Rating';
import FormField from 'components/FormField';

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

export const BodyTypesView = () => {

	const user = getSetting('user');
	const { bodyTypes, favorites, reviews } = useLoaderData() as LoaderData;
	const fetcher = useFetcher();
	const navigate = useNavigate();
	const navigation = useNavigation();

	const [makeTypeName, setMakeTypeName] = useState<'all' | string>('all');
	const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
	const [onlyReviewed, setOnlyReviewed] = useState<boolean>(false);

	const visibleBodyTypes = bodyTypes.filter(({ _id, model }) => {

		const favorite = favorites.find(row => row.bodyTypeId === _id);
		const review = reviews.find(row => row.bodyTypeId === _id);

		if (makeTypeName !== 'all' && model.makeType.name !== makeTypeName) return false;
		if (onlyFavorites && !favorite) return false;
		if (onlyReviewed && !review) return false;
		return true;

	});

	return (
		<Page
			title='Body Types'
			isEmpty={bodyTypes.length === 0}
			filters={
				<>
					{user?.role === 'user' &&
						<FormField
							field={{
								name: 'onlyShowFavorites',
								fieldType: 'input',
								type: 'checkbox',
								checked: onlyFavorites,
								onChange: () => setOnlyFavorites(prev => !prev),
							}}
							size='tiny'
						/>
					}
					{user?.role === 'user' &&
						<FormField
							field={{
								name: 'onlyShowReviewed',
								fieldType: 'input',
								type: 'checkbox',
								checked: onlyReviewed,
								onChange: () => setOnlyReviewed(prev => !prev),
							}}
							size='tiny'
						/>
					}
					<FormField
						field={{
							name: 'makeType',
							fieldType: 'select',
							options: [
								'all',
								...[...new Set(bodyTypes.map(row => row.model.makeType.name).filter(Boolean))],
							],
							value: makeTypeName,
							onChange: ({ target }) => setMakeTypeName(target.value),
						}}
						size='tiny'
					/>
				</>
			}
			hasAdd={user?.role === 'admin'}
			isGridView
		>
			{visibleBodyTypes.map(({ _id, name, model }) => {

				const favorite = favorites.find(row => row.bodyTypeId === _id);
				const review = reviews.find(row => row.bodyTypeId === _id);

				const actions: CardProps['actions'] = (
					user?.role === 'admin'
						? [
							{
								text: 'Update',
								icon: 'update',
								fullWidth: true,
								onClick: () => navigate(`update/${_id}`),
								isLoading: (
									navigation.state !== 'idle'
									&& navigation.location.pathname === `/body-types/update/${_id}`
								),
							},
						]
						: [
							{
								text: favorite ? 'Unfavorite' : 'Favorite',
								icon: favorite ? 'starFilled' : 'star',
								color: 'warning',
								onClick: () => {
									const urlSuffix = (
										!favorite
											? 'add'
											: `delete/${favorite._id}`
									);
									fetcher.submit(null, {
										action: `/body-types/favorite/${_id}/${urlSuffix}`,
										method: favorite ? 'delete' : 'post',
									});
								},
								isLoading: (
									fetcher.state !== 'idle'
									&& fetcher.formAction?.startsWith(`/body-types/favorite/${_id}`)
								),
							},
							{
								text: `${!review ? 'Add' : 'Change'} Review`,
								icon: 'review',
								color: 'info',
								onClick: () => {
									const urlSuffix = (
										!review
											? 'add'
											: `update/${review._id}`
									);
									navigate(`review/${_id}/${urlSuffix}`);
								},
								isLoading: (
									navigation.state !== 'idle'
									&& navigation.location.pathname.startsWith(`/body-types/review/${_id}`)
								),
							},
						]
				);

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
								title: `Make Type: ${humanizeToken(model.makeType.name)}`,
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
