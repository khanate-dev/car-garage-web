import {
	ActionFunction,
	redirect,
	useLoaderData,
} from 'react-router-dom';

import { reviewFormFields } from 'schemas/review';
import { BodyType } from 'schemas/body-type';
import { getBodyType } from 'endpoints/body-type';
import { createReview } from 'endpoints/review';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormLoader, FormLoaderData } from 'types/general';

const formName = 'reviews-add';

interface Data {
	bodyType: BodyType,
}
type Form = Record<never, never>;

export const reviewsAddLoader: FormLoader<Form, Data> = async ({ params }) => {
	const bodyType = await getBodyType(params.bodyTypeId);
	return {
		bodyType,
	};
};

export const reviewsAddAction: ActionFunction = async ({
	params,
	request,
}) => {
	try {
		const formData = await request.formData();
		formData.append('bodyTypeId', params.bodyTypeId ?? '');
		await createReview(formData);
		return redirect('/body-types');
	}
	catch (error: any) {
		return getActionError({
			source: formName,
			error,
		});
	}
};

export const ReviewsAdd = () => {
	const {
		bodyType: { name, model },
	} = useLoaderData() as FormLoaderData<Form, Data>;

	return (
		<Page
			title='Add Review'
			hasBack
		>
			<Form
				title={`Reviewing ${model.makeType.name} ${model.name} ${name}`}
				page={formName}
				fields={reviewFormFields}
				noGrid
			/>
		</Page>
	);
};
