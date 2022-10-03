import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { z } from 'zod';

import {
	Product,
	productCategoryColors,
	productModelSchema,
} from 'schemas/product';

import { formatDateTime } from 'helpers/date';
import { humanizeString } from 'helpers/string';

import Page from 'components/Page';
import Card, { CardProps } from 'components/Card';

import styles from './products.module.scss';

export const productsLoader: LoaderFunction = async () => {
	// // const products = await getRequest('product');
	const products: Product[] = [
		{
			__v: 1,
			_id: '63388570155ecedc37dd5dce',
			category: 'bike',
			createdAt: new Date().toUTCString(),
			makeTypeId: '63388570155ecedc37dd5dce',
			maxPrice: 4500,
			minPrice: 4050,
			sellerId: '63388570155ecedc37dd5dce',
			title: 'Some Bike',
			updatedAt: new Date().toUTCString(),
			bodyTypeId: '63388570155ecedc37dd5dce',
			buyerId: '63388570155ecedc37dd5dce',
			description: 'Very good condition',
			image: 'https://asia.olympus-imaging.com/content/000107506.jpg',
			modelId: '63388570155ecedc37dd5dce',
		},
		{
			__v: 1,
			_id: '63388570155ecedc37dd5dce',
			category: 'car',
			createdAt: new Date().toUTCString(),
			makeTypeId: '63388570155ecedc37dd5dce',
			maxPrice: 4500,
			minPrice: 4050,
			sellerId: '63388570155ecedc37dd5dce',
			title: 'Some Bike',
			updatedAt: new Date().toUTCString(),
			bodyTypeId: '63388570155ecedc37dd5dce',
			description: 'Very good condition',
			image: 'https://asia.olympus-imaging.com/content/000107506.jpg',
			modelId: '63388570155ecedc37dd5dce',
		},
		{
			__v: 1,
			_id: '63388570155ecedc37dd5dce',
			category: 'auto-parts',
			createdAt: new Date().toUTCString(),
			makeTypeId: '63388570155ecedc37dd5dce',
			maxPrice: 4500,
			minPrice: 4050,
			sellerId: '63388570155ecedc37dd5dce',
			title: 'Some Bike',
			updatedAt: new Date().toUTCString(),
			buyerId: '63388570155ecedc37dd5dce',
			description: 'Very good condition',
			image: 'https://asia.olympus-imaging.com/content/000107506.jpg',
			isFeatured: true,
		},
		{
			__v: 1,
			_id: '63388570155ecedc37dd5dce',
			category: 'bike',
			createdAt: new Date().toUTCString(),
			makeTypeId: '63388570155ecedc37dd5dce',
			maxPrice: 4500,
			minPrice: 4050,
			sellerId: '63388570155ecedc37dd5dce',
			title: 'Some Bike',
			updatedAt: new Date().toUTCString(),
			bodyTypeId: '63388570155ecedc37dd5dce',
			buyerId: '63388570155ecedc37dd5dce',
			description: 'Very good condition',
			image: 'https://asia.olympus-imaging.com/content/000107506.jpg',
			modelId: '63388570155ecedc37dd5dce',
		},
		{
			__v: 1,
			_id: '63388570155ecedc37dd5dce',
			category: 'car',
			createdAt: new Date().toUTCString(),
			makeTypeId: '63388570155ecedc37dd5dce',
			maxPrice: 4500,
			minPrice: 4050,
			sellerId: '63388570155ecedc37dd5dce',
			title: 'Some Bike',
			updatedAt: new Date().toUTCString(),
			bodyTypeId: '63388570155ecedc37dd5dce',
			description: 'Very good condition',
			image: 'https://asia.olympus-imaging.com/content/000107506.jpg',
			modelId: '63388570155ecedc37dd5dce',
		},
		{
			__v: 1,
			_id: '63388570155ecedc37dd5dce',
			category: 'auto-parts',
			createdAt: new Date().toUTCString(),
			makeTypeId: '63388570155ecedc37dd5dce',
			maxPrice: 4500,
			minPrice: 4050,
			sellerId: '63388570155ecedc37dd5dce',
			title: 'Some Bike',
			updatedAt: new Date().toUTCString(),
			buyerId: '63388570155ecedc37dd5dce',
			description: 'Very good condition',
			image: 'https://asia.olympus-imaging.com/content/000107506.jpg',
			isFeatured: true,
		},
		{
			__v: 1,
			_id: '63388570155ecedc37dd5dce',
			category: 'bike',
			createdAt: new Date().toUTCString(),
			makeTypeId: '63388570155ecedc37dd5dce',
			maxPrice: 4500,
			minPrice: 4050,
			sellerId: '63388570155ecedc37dd5dce',
			title: 'Some Bike',
			updatedAt: new Date().toUTCString(),
			bodyTypeId: '63388570155ecedc37dd5dce',
			buyerId: '63388570155ecedc37dd5dce',
			description: 'Very good condition',
			image: 'https://asia.olympus-imaging.com/content/000107506.jpg',
			modelId: '63388570155ecedc37dd5dce',
		},
		{
			__v: 1,
			_id: '63388570155ecedc37dd5dce',
			category: 'car',
			createdAt: new Date().toUTCString(),
			makeTypeId: '63388570155ecedc37dd5dce',
			maxPrice: 4500,
			minPrice: 4050,
			sellerId: '63388570155ecedc37dd5dce',
			title: 'Some Bike',
			updatedAt: new Date().toUTCString(),
			bodyTypeId: '63388570155ecedc37dd5dce',
			description: 'Very good condition',
			image: 'https://asia.olympus-imaging.com/content/000107506.jpg',
			modelId: '63388570155ecedc37dd5dce',
		},
		{
			__v: 1,
			_id: '63388570155ecedc37dd5dce',
			category: 'auto-parts',
			createdAt: new Date().toUTCString(),
			makeTypeId: '63388570155ecedc37dd5dce',
			maxPrice: 4500,
			minPrice: 4050,
			sellerId: '63388570155ecedc37dd5dce',
			title: 'Some Bike',
			updatedAt: new Date().toUTCString(),
			buyerId: '63388570155ecedc37dd5dce',
			description: 'Very good condition',
			image: 'https://asia.olympus-imaging.com/content/000107506.jpg',
			isFeatured: true,
		},
	];
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
					title: humanizeString(category),
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

					/>
				);

			})}
		</Page>
	);

};