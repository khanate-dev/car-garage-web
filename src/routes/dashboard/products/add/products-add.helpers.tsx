import { ActionFunction, LoaderFunction, redirect } from 'react-router-dom';

import { ProductCategory, ProductSansMeta } from 'schemas/product';
import { getBodyTypes } from 'endpoints/body-type';
import { getModels } from 'endpoints/model';
import { getMakeTypes } from 'endpoints/make-type';
import { createProduct } from 'endpoints/product';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormField } from 'types/general';
import { humanizeString } from 'helpers/string';

export const getProductsAddLoader = (
	category: ProductCategory
): LoaderFunction => async () => {

	const makeTypes = await getMakeTypes();
	const makeTypeOptions = makeTypes.map(({ _id, name }) => ({
		label: name,
		value: _id,
	}));

	if (category === 'auto-parts') return {
		makeTypesId: makeTypeOptions,
	};

	const models = await getModels();
	const bodyTypes = await getBodyTypes();
	const options = {
		makeTypeId: makeTypeOptions,
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

export const getProductsAddAction = (
	category: ProductCategory
): ActionFunction => async ({ request }) => {
	try {
		const formData = await request.formData();
		formData.set('category', category);
		await createProduct(formData);
		return redirect('/products');
	}
	catch (error: any) {
		return getActionError({
			source: `products-add-${category}`,
			error,
		});
	}
};

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
		name: 'makeTypeId',
		fieldType: 'select',
		required: true,
	},
	{
		name: 'modelId',
		fieldType: 'select',
	},
	{
		name: 'bodyTypeId',
		fieldType: 'select',
	},
	{
		name: 'isFeatured',
		fieldType: 'input',
		label: 'Is this a featured product?',
		type: 'checkbox',
	},
];

export const getProductsAddFields = (
	category: ProductCategory
) => (
	category === 'auto-parts'
		? fields.filter(field =>
			!['modelId', 'bodyTypeId'].includes(field.name)
		)
		: fields
);

export const getProductsAddComponent = (category: ProductCategory) => (
	<Page
		title={`Add Product - ${humanizeString(category)}`}
		hasBack
	>
		<Form
			page={`products-add-${category}`}
			fields={getProductsAddFields(category)}
		/>
	</Page>
);