import { ActionFunction, redirect } from 'react-router-dom';

import { MakeTypeForm, makeTypeFormFields } from 'schemas/make-type';
import { getMakeType, updateMakeType } from 'endpoints/make-type';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormLoader } from 'types/general';

const formName = 'make-types-update';

export const makeTypesUpdateLoader: FormLoader<MakeTypeForm> = async ({
	params,
}) => {
	const { name } = await getMakeType(params.makeTypeId);
	return {
		name: {
			value: name,
		},
	};
};

export const makeTypesUpdateAction: ActionFunction = async ({
	params,
	request,
}) => {
	try {
		const formData = await request.formData();
		await updateMakeType(params.makeTypeId, formData);
		return redirect('/make-types');
	}
	catch (error: any) {
		return getActionError({
			source: formName,
			error,
		});
	}
};

export const MakeTypesUpdate = () => (
	<Page
		title='Update Make Type'
		hasBack
	>
		<Form
			page={formName}
			fields={makeTypeFormFields}
			noGrid
		/>
	</Page>
);
