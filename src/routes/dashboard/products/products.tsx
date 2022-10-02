import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { z } from 'zod';

import {
	Product,
	productCategoryColors,
	productModelSchema,
} from 'schemas/product';

import { formatDateTime } from 'helpers/date';
import { getRequest } from 'helpers/api';

import Page from 'components/Page';
import Card, { CardProps } from 'components/Card';

import styles from './products.module.scss';

export const productsLoader: LoaderFunction = async () => {
	const products = await getRequest('product');
	return z.array(productModelSchema).parse(products);
};

export const Products = () => {

	const products = useLoaderData() as Product[];

	return (
		<Page
			title='Products'
			className={styles['container']}
			isEmpty={products.length === 0}
		>
			{products.map(({ _id,
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
					title: category,
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
						image={image}
						labels={labels}
						cover={image}
						title={title}
						subtitle={formatDateTime(createdAt)}
						description={description}

					/>
				);

			})}
		</Page>
	);

};