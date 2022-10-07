import {
	ActionFunction,
	redirect,
} from 'react-router-dom';

import { bodyTypeFormFields, BodyTypeRequest } from 'schemas/body-type';
import { createBodyType } from 'endpoints/body-type';
import { getModels } from 'endpoints/model';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormLoader } from 'types/general';

export const bodyTypesAddLoader: FormLoader<BodyTypeRequest> = async () => {
	const models = await getModels();
	return {
		modelId: {
			options: models.map(({ _id, name }) => ({
				label: name,
				value: _id,
			})),
		},
		name: {},
	};
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

export const BodyTypesAdd = () => (
	<Page
		title='Add Body Type'
		hasBack
	>
		<Form
			page='body-types-add'
			fields={bodyTypeFormFields}
			noGrid
		/>
	</Page>
);
