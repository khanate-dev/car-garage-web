import { useState } from 'react';
import {
	LoaderFunction,
	useFetcher,
	useLoaderData,
	useNavigate,
	useNavigation,
} from 'react-router-dom';

import {
	Product,
	productCategories,
	ProductCategory,
	productCategoryColors,
} from 'schemas/product';
import { getProducts } from 'endpoints/product';

import { formatDateTime } from 'helpers/date';
import { humanizeToken } from 'helpers/string';
import { objectToFormData } from 'helpers/form';
import { getSetting } from 'helpers/settings';

import Page from 'components/Page';
import Card, { CardProps } from 'components/Card';
import FormField from 'components/FormField';

import styles from './products-view.module.scss';

export const productsViewLoader: LoaderFunction = getProducts;

export const ProductsView = () => {

	const user = getSetting('user');
	const products = useLoaderData() as Product[];
	const navigate = useNavigate();
	const navigation = useNavigation();
	const fetcher = useFetcher();

	const [search, setSearch] = useState<string>('');
	const [owner, setOwner] = useState<'all' | 'me' | 'others'>('all');
	const [showSold, setShowSold] = useState(false);
	const [category, setCategory] = useState<'all' | ProductCategory>('all');
	const [makeTypeName, setMakeTypeName] = useState<'all' | string>('all');

	const visibleFilters = products.filter(({
		title,
		description,
		sellerId,
		buyerId,
		makeType,
		category: currentCategory,
	}) => {
		if (
			search
			&& !(`${title} ${description}`.includes(search))
		) return false;
		if (owner === 'me' && user?._id !== sellerId) return false;
		if (owner === 'others' && user?._id === sellerId) return false;
		if (showSold && !buyerId) return false;
		if (!showSold && buyerId) return false;
		if (category !== 'all' && category !== currentCategory) return false;
		if (makeTypeName !== 'all' && makeTypeName !== makeType.name) return false;

		return true;

	}).sort((a, b) => {
		return (
			(a.isFeatured && !b.isFeatured)
			|| (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime())
		) ? -1 : 1;
	});

	return (
		<Page
			title='Products'
			isEmpty={products.length === 0}
			filters={
				<>
					<FormField
						field={{
							fieldType: 'input',
							name: 'search',
							type: 'search',
							value: search,
							onChange: ({ target }) => setSearch(target.value),
						}}
						size='tiny'
					/>
					{user?.role === 'user' &&
						<FormField
							field={{
								fieldType: 'select',
								name: 'owner',
								label: 'Creator',
								value: owner,
								options: ['all', 'me', 'others'],
								onChange: ({ target }) => setOwner(target.value as any),
							}}
							size='tiny'
						/>
					}
					<FormField
						field={{
							fieldType: 'input',
							name: 'showSold',
							type: 'checkbox',
							checked: showSold,
							onChange: () => setShowSold(prev => !prev),
						}}
						size='tiny'
					/>
					<FormField
						field={{
							fieldType: 'select',
							name: 'category',
							value: category,
							options: ['all', ...productCategories],
							onChange: ({ target }) => setCategory(target.value as any),
						}}
						size='tiny'
					/>
					<FormField
						field={{
							fieldType: 'select',
							name: 'modelId',
							value: makeTypeName,
							options: [
								'all',
								...new Set(products.map(row => row.makeType.name ?? '').filter(Boolean)),
							],
							onChange: ({ target }) => setMakeTypeName(target.value),
						}}
						size='tiny'
					/>
				</>
			}
			hasAdd={user?.role !== 'admin'}
			isGridView
		>

			{visibleFilters.map(product => {

				const {
					_id,
					image,
					title,
					category,
					buyerId,
					sellerId,
					makeTypeId,
					makeType,
					bodyTypeId,
					bodyType,
					modelId,
					model,
					description,
					maxPrice,
					minPrice,
					createdAt,
					isFeatured,
				} = product;

				const labels: CardProps['labels'] = [{
					title: humanizeToken(category),
					color: productCategoryColors[category],
				}];
				if (isFeatured) {
					labels.unshift({
						title: 'Featured',
						color: 'warning',
					});
				}
				if (buyerId) {
					labels.push({
						title: 'Sold',
						color: 'secondary',
					});
				}

				const details: NonNullable<CardProps['details']> = [
					{
						label: 'Make',
						value: makeTypeId,
					},
					{
						label: 'Seller',
						value: sellerId,
					},
					{
						label: 'Price Range',
						value: `${minPrice} - ${maxPrice}`,
					},
				];
				if (category !== 'auto-parts') {
					details?.push({
						label: 'Model',
						value: modelId ?? '',
					});
					details?.push({
						label: 'Body',
						value: bodyTypeId ?? '',
					});
				}

				const actions: NonNullable<CardProps['actions']> = [];

				if (sellerId === user?._id) {
					actions.push(
						{
							text: 'Update',
							icon: 'update',
							onClick: () => navigate(`update/${_id}`),
							isLoading: (
								navigation.state !== 'idle'
								&& navigation.location.pathname === `/products/update/${_id}`
							),
						},
						{
							text: 'Delete',
							icon: 'delete',
							color: 'danger',
							onClick: () => fetcher.submit(null, {
								action: `/products/delete/${_id}`,
								method: 'delete',
							}),
							isLoading: (
								fetcher.state !== 'idle'
								&& fetcher.formAction === `/products/delete/${_id}`
							),
						}
					);
				}

				if (!buyerId && sellerId !== user?._id && user?.role !== 'admin') {
					actions.push({
						text: 'Buy',
						icon: 'buy',
						color: 'success',
						onClick: () => fetcher.submit(
							objectToFormData(product, [
								'__v',
								'_id',
								'bodyType',
								'buyer',
								'createdAt',
								'makeType',
								'model',
								'seller',
								'updatedAt',
							]),
							{
								action: `/products/buy/${_id}`,
								method: 'put',
							}
						),
						isLoading: (
							fetcher.state !== 'idle'
							&& fetcher.formAction === `/products/buy/${_id}`
						),
						fullWidth: true,
					});
				}

				return (
					<Card
						key={_id}
						labels={labels}
						cover={image}
						color={isFeatured ? 'warning' : 'primary'}
						title={title}
						subtitle={
							<div
								className={styles['subtitle']}
							>
								<span>
									{[
										makeType.name,
										bodyType?.name,
										model?.name,
										model?.year,
									].filter(Boolean).join(' ')}
								</span>
								<span>{formatDateTime(createdAt)}</span>
								<span>{minPrice} - {maxPrice} Rupees</span>
							</div>
						}
						description={description}
						actions={actions}
					/>
				);

			})}
		</Page>
	);

};
