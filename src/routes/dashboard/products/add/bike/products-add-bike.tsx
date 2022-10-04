import { ProductCategory } from 'schemas/product';

import {
	getProductsAddAction,
	getProductsAddComponent,
	getProductsAddLoader,
} from '../products-add.helpers';

const category: ProductCategory = 'bike';

export const productsAddBikeLoader = getProductsAddLoader(category);

export const productsAddBikeAction = getProductsAddAction(category);

export const ProductsAddBike = () => getProductsAddComponent(category);