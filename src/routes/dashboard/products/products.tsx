import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { z } from 'zod';

import { Product, productModelSchema } from 'schemas/product';

import { getRequest } from 'helpers/api';

import Page from 'components/Page';
import Table from 'components/Table';

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
		>
			<Table
				list={products}
			/>
		</Page>
	);

};