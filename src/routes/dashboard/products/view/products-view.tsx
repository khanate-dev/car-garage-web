import {
	LoaderFunction,
	useFetcher,
	useLoaderData,
	useNavigate,
	useNavigation,
} from 'react-router-dom';

import {
	Product,
	productCategoryColors,
} from 'schemas/product';
import { getProducts } from 'endpoints/product';

import { formatDateTime } from 'helpers/date';
import { humanizeToken } from 'helpers/string';

import Page from 'components/Page';
import Card, { CardProps } from 'components/Card';

export const productsViewLoader: LoaderFunction = getProducts;

export const ProductsView = () => {

	const products = useLoaderData() as Product[];
	const navigate = useNavigate();
	const navigation = useNavigation();
	const fetcher = useFetcher();

	return (
		<Page
			title='Products'
			isEmpty={products.length === 0}
			hasAdd
			isGridView
		>
			{products.map(({
				_id,
				image,
				title,
				category,
				buyerId,
				sellerId,
				makeTypeId,
				bodyTypeId,
				modelId,
				description,
				maxPrice,
				minPrice,
				createdAt,
				isFeatured,
			}) => {

				const labels: CardProps['labels'] = [{
					title: humanizeToken(category),
					color: productCategoryColors[category],
				}];
				if (isFeatured) {
					labels.push({
						title: 'Featured',
						color: 'primary',
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

				return (
					<Card
						key={_id}
						labels={labels}
						cover={image}
						title={title}
						subtitle={formatDateTime(createdAt)}
						description={description}
						actions={[
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
							},
						]}
					/>
				);

			})}
		</Page>
	);

};
