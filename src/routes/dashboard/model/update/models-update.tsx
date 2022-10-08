import { ActionFunction, redirect } from 'react-router-dom';

import { ModelForm, modelFormFields } from 'schemas/model';
import { getMakeTypes } from 'endpoints/make-type';
import { getModel, updateModel } from 'endpoints/model';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormLoader } from 'types/general';

const formName = 'models-update';

export const modelsUpdateLoader: FormLoader<ModelForm> = async ({
	params,
}) => {
	const makeTypes = await getMakeTypes();
	const { makeTypeId, name, year } = await getModel(params.modelId);
	return {
		makeTypeId: {
			options: makeTypes.map(({ _id, name }) => ({
				label: name,
				value: _id,
			})),
			value: makeTypeId,
		},
		name: {
			value: name,
		},
		year: {
			value: year,
		},
	};
};

export const modelsUpdateAction: ActionFunction = async ({
	params,
	request,
}) => {
	try {
		const formData = await request.formData();
		await updateModel(params.modelId, formData);
		return redirect('/models');
	}
	catch (error: any) {
		return getActionError({
			source: formName,
			error,
		});
	}
};

export const ModelsUpdate = () => (
	<Page
		title='Update Model'
		hasBack
	>
		<Form
			page={formName}
			fields={modelFormFields}
			noGrid
		/>
	</Page>
);
