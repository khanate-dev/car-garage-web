import {
	ActionFunction,
	redirect,
} from 'react-router-dom';

import { bodyTypeFormFields, BodyTypeRequest } from 'schemas/body-type';
import { getBodyType, putBodyType } from 'endpoints/body-type';
import { getModels } from 'endpoints/model';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormLoader } from 'types/general';

const formName = 'body-types-update';

export const bodyTypesUpdateLoader: FormLoader<BodyTypeRequest> = async ({ params }) => {
	const models = await getModels();
	const { modelId, name } = await getBodyType(params.bodyTypeId);
	return {
		modelId: {
			options: models.map(({ _id, name }) => ({
				label: name,
				value: _id,
			})),
			value: modelId,
		},
		name: {
			value: name,
		},

	};
};

export const bodyTypesUpdateAction: ActionFunction = async ({ params, request }) => {
	try {
		const formData = await request.formData();
		await putBodyType(params.bodyTypeId, formData);
		return redirect('/body-types');
	}
	catch (error: any) {
		return getActionError({
			source: formName,
			error,
		});
	}
};

export const BodyTypesUpdate = () => (
	<Page
		title='Update Body Type'
		hasBack
	>
		<Form
			page={formName}
			fields={bodyTypeFormFields}
			noGrid
		/>
	</Page>
);
