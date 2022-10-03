import {
	ActionFunction,
	LoaderFunction,
	redirect,
} from 'react-router-dom';

import { CreateBodyType } from 'schemas/body-type';
import { createBodyType } from 'endpoints/body-type';
import { getModels } from 'endpoints/model';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormField, SelectOptions } from 'types/general';

type BodyTypeAddOptions = Record<
	'modelId',
	SelectOptions
>;

export const bodyTypesAddLoader: LoaderFunction = async () => {
	const models = await getModels();
	const options: BodyTypeAddOptions = {
		modelId: models.map(({ _id, name }) => ({
			label: name,
			value: _id,
		})),
	};
	return options;
};

export const bodyTypesAddAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		await createBodyType(formData);
		return redirect('/body-types');
	}
	catch (error: any) {
		return getActionError({
			source: 'body-types-add',
			error,
		});
	}
};

const fields: FormField<CreateBodyType>[] = [
	{
		fieldType: 'select',
		name: 'modelId',
		required: true,
	},
	{
		fieldType: 'input',
		name: 'name',
		required: true,
	},
];

export const BodyTypesAdd = () => (
	<Page
		title='Add Body Type'
		hasBack
	>
		<Form
			page='body-types-add'
			fields={fields}
			noGrid
		/>
	</Page>
);