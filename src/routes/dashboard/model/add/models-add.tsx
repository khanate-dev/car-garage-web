import { ActionFunction, redirect } from 'react-router-dom';

import { ModelForm, modelFormFields } from 'schemas/model';
import { getMakeTypes } from 'endpoints/make-type';
import { createModel } from 'endpoints/model';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormLoader } from 'types/general';

const formName = 'models-add';

export const modelsAddLoader: FormLoader<ModelForm> = async () => {
	const makeTypes = await getMakeTypes();
	return {
		makeTypeId: {
			options: makeTypes.map(({ _id, name }) => ({
				label: name,
				value: _id,
			})),
		},
		name: {},
		year: {},
	};
};

export const modelsAddAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		await createModel(formData);
		return redirect('/models');
	}
	catch (error: any) {
		return getActionError({
			source: formName,
			error,
		});
	}
};

export const ModelsAdd = () => (
	<Page
		title='Add Model'
		hasBack
	>
		<Form
			page={formName}
			fields={modelFormFields}
			noGrid
		/>
	</Page>
);
