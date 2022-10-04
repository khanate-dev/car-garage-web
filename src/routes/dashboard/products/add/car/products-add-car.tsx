import { ProductCategory } from 'schemas/product';

import {
	getProductsAddAction,
	getProductsAddComponent,
	getProductsAddLoader,
} from '../products-add.helpers';

const category: ProductCategory = 'car';

export const productsAddCarLoader = getProductsAddLoader(category);

export const productsAddCarAction = getProductsAddAction(category);

export const ProductsAddCar = () => getProductsAddComponent(category);