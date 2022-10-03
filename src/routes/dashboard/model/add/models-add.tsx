import { ActionFunction, LoaderFunction, redirect } from 'react-router-dom';

import { ModelSansMeta } from 'schemas/model';
import { getMakeTypes } from 'endpoints/make-type';
import { createModel } from 'endpoints/model';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormField, SelectOptions } from 'types/general';

type ModelAddOptions = Record<
	'makeTypeId',
	SelectOptions
>;

export const modelsAddLoader: LoaderFunction = async () => {
	const makeTypes = await getMakeTypes();
	const options: ModelAddOptions = {
		makeTypeId: makeTypes.map(({ _id, name }) => ({
			label: name,
			value: _id,
		})),
	};
	return options;
};

export const modelsAddAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		await createModel(formData);
		return redirect('/models');
	}
	catch (error: any) {
		return getActionError({
			source: 'models-add',
			error,
		});
	}
};

const fields: FormField<ModelSansMeta>[] = [
	{
		fieldType: 'input',
		name: 'name',
		required: true,
	},
	{
		fieldType: 'input',
		name: 'year',
		type: 'number',
		required: true,
	},
	{
		fieldType: 'select',
		name: 'makeTypeId',
		required: true,
	},
];

export const ModelsAdd = () => (
	<Page
		title='Add Model'
		hasBack
	>
		<Form
			page='models-add'
			fields={fields}
			noGrid
		/>
	</Page>
);