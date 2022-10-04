import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { getProducts } from 'endpoints/product';
import { getMakeTypes } from 'endpoints/make-type';
import { getModels } from 'endpoints/model';
import { getBodyTypes } from 'endpoints/body-type';
import { getSetting } from 'helpers/settings';

import Page from 'components/Page';
import Card, { CardProps } from 'components/Card';

import styles from './overview.module.scss';
import { icons } from 'components/icons';

export const overviewLoader: LoaderFunction = async () => {
	const products = await getProducts();
	const makeTypes = await getMakeTypes();
	const models = await getModels();
	const bodyTypes = await getBodyTypes();

	const cards: CardProps[] = [
		{
			title: 'Products',
			color: 'danger',
			icon: icons.products,
			details: [
				{
					label: 'Total',
					value: products.length.toString(),
				},
				{
					label: 'Open',
					value: products.filter(row => !row.buyerId).length.toString(),
				},
				{
					label: 'Featured',
					value: products.filter(row => !row.buyerId && row.isFeatured).length.toString(),
				},
				{
					label: 'Sold',
					value: products.filter(row => !row.buyerId).length.toString(),
				},
			],
		},
		{
			title: 'Make Types',
			color: 'success',
			icon: icons.makeTypes,
			details: [{
				label: 'Total',
				value: makeTypes.length.toString(),
			}],
		},
		{
			title: 'Models',
			color: 'info',
			icon: icons.models,
			details: [{
				label: 'Total',
				value: models.length.toString(),
			}],
		},
		{
			title: 'Body Types',
			color: 'warning',
			icon: icons.bodyTypes,
			details: [{
				label: 'Total',
				value: bodyTypes.length.toString(),
			}],
		},
	];
	return cards;
};

export const Overview = () => {

	const user = getSetting('user');
	const cards = useLoaderData() as CardProps[];

	return (
		<Page
			title='Overview'
			className={styles['container']}
		>
			<Card
				title='Car Garage'
				subtitle={`Welcome, ${user?.name.split(' ')[0]}`}
				description='You can see analytics and reports on this page'
				size='huge'
				centered
			/>
			{cards.map((card, index) =>
				<Card
					key={index}
					{...card}
				/>
			)}
		</Page>
	);

};