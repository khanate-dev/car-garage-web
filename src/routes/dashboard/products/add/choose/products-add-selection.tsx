import { useNavigate } from 'react-router-dom';

import { productCategories } from 'schemas/product';

import Form from 'components/Form';

import { FormField } from 'types/general';
import Page from 'components/Page';

type Form = Record<'category', boolean>;

const fields: FormField<Form>[] = productCategories.map(category => ({
	fieldType: 'input',
	type: 'radio',
	name: 'category',
	id: category,
	label: category,
	required: true,
}));

export const ProductsAddSelection = () => {

	const navigate = useNavigate();

	return (
		<Page
			title='Add Product - Selection'
			hasBack
		>
			<Form
				title='Please select the type of product'
				page='products-add'
				fields={fields}
				onSubmit={event => {
					event.preventDefault();
					const checked = event.currentTarget.querySelector(
						'input[type=radio]:checked'
					);
					if (!checked?.id) return;
					navigate(checked.id);
				}}
				noGrid
			/>
		</Page>
	);

};