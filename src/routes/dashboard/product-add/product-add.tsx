import { productCategories, ProductSansMeta } from 'schemas/product';

import Form from 'components/Form';

import { FormField, SelectOptions } from 'types/general';
import { ActionFunction, LoaderFunction, redirect } from 'react-router-dom';
import { getBodyTypes } from 'endpoints/body-type';
import { getModels } from 'endpoints/model';
import { getMakeTypes } from 'endpoints/make-type';
import { createProduct } from 'endpoints/product';
import { getActionError } from 'helpers/route';
import Page from 'components/Page';

const fields: FormField<ProductSansMeta>[] = [
	{
		name: 'title',
		fieldType: 'input',
		required: true,
	},
	{
		name: 'description',
		fieldType: 'input',
	},
	{
		name: 'minPrice',
		fieldType: 'input',
		type: 'number',
		min: 1,
		required: true,
	},
	{
		name: 'maxPrice',
		fieldType: 'input',
		type: 'number',
		min: 1,
		required: true,
	},
	{
		name: 'category',
		fieldType: 'select',
		options: productCategories as any,
		required: true,
	},
	{
		name: 'makeTypeId',
		fieldType: 'select',
		required: true,
	},
	{
		name: 'modelId',
		fieldType: 'select',
		getHidden: ({ category }) => category === 'auto-parts',
	},
	{
		name: 'bodyTypeId',
		fieldType: 'select',
		getHidden: ({ category }) => category === 'auto-parts',
	},
	{
		name: 'isFeatured',
		fieldType: 'input',
		label: 'Is this a featured product?',
		type: 'checkbox',
	},
];

type ProductAddOptions = Record<
	'makeTypeId' | 'modelId' | 'bodyTypeId',
	SelectOptions
>;

export const productAddLoader: LoaderFunction = async () => {
	const makeTypes = await getMakeTypes();
	const models = await getModels();
	const bodyTypes = await getBodyTypes();
	const options: ProductAddOptions = {
		makeTypeId: makeTypes.map(({ _id, name }) => ({
			label: name,
			value: _id,
		})),
		modelId: models.map(({ _id, name }) => ({
			label: name,
			value: _id,
		})),
		bodyTypeId: bodyTypes.map(({ _id, name }) => ({
			label: name,
			value: _id,
		})),
	};
	return options;
};

export const productAddAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		await createProduct(formData);
		return redirect('/products');
	}
	catch (error: any) {
		return getActionError({
			source: 'product-add',
			error,
		});
	}
};

export const ProductAdd = () => {

	return (
		<Page
			title='Add Product'
			hasBack
		>
			<Form
				page='product-add'
				fields={fields}
			/>
		</Page>
	);

};