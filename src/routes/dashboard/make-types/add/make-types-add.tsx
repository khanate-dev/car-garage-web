import { ActionFunction, redirect } from 'react-router-dom';

import { MakeTypeSansMeta } from 'schemas/make-type';
import { createMakeType } from 'endpoints/make-type';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';

import { FormField } from 'types/general';
import Page from 'components/Page';

export const makeTypesAddAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		await createMakeType(formData);
		return redirect('/make-types');
	}
	catch (error: any) {
		return getActionError({
			source: 'make-types-add',
			error,
		});
	}
};

const fields: FormField<MakeTypeSansMeta>[] = [{
	fieldType: 'input',
	name: 'name',
	required: true,
}];

export const MakeTypesAdd = () => (
	<Page
		title='Add Make Type'
		hasBack
	>
		<Form
			page='make-types-add'
			fields={fields}
			noGrid
		/>
	</Page>
);