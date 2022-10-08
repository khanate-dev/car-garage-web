import { ActionFunction, redirect } from 'react-router-dom';

import { makeTypeFormFields } from 'schemas/make-type';
import { createMakeType } from 'endpoints/make-type';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

const formName = 'make-types-add';

export const makeTypesAddAction: ActionFunction = async ({
	request,
}) => {
	try {
		const formData = await request.formData();
		await createMakeType(formData);
		return redirect('/make-types');
	}
	catch (error: any) {
		return getActionError({
			source: formName,
			error,
		});
	}
};

export const MakeTypesAdd = () => (
	<Page
		title='Add Make Type'
		hasBack
	>
		<Form
			page={formName}
			fields={makeTypeFormFields}
			noGrid
		/>
	</Page>
);
