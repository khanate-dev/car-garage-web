import { ProductCategory } from 'schemas/product';

import {
	getProductsAddAction,
	getProductsAddComponent,
	getProductsAddLoader,
} from '../products-add.helpers';

const category: ProductCategory = 'auto-parts';

export const productsAddAutoPartsLoader = getProductsAddLoader(category);

export const productsAddAutoPartsAction = getProductsAddAction(category);

export const ProductsAddAutoParts = () => getProductsAddComponent(category);