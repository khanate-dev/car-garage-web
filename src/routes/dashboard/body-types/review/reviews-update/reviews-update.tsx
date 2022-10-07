import {
	ActionFunction,
	redirect,
	useLoaderData,
} from 'react-router-dom';

import { ReviewForm, reviewFormFields } from 'schemas/review';
import { BodyType } from 'schemas/body-type';
import { getBodyType } from 'endpoints/body-type';
import { getReview, putReview } from 'endpoints/review';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormLoader, FormLoaderData } from 'types/general';

const formName = 'reviews-update';

interface Data {
	bodyType: BodyType,
}

export const reviewsUpdateLoader: FormLoader<ReviewForm, Data> = async ({ params }) => {
	const bodyType = await getBodyType(params.bodyTypeId);
	const { description, rating } = await getReview(params.reviewId);
	return {
		description: {
			value: description,
		},
		rating: {
			value: rating,
		},
		bodyType,
	};
};

export const reviewsUpdateAction: ActionFunction = async ({
	params,
	request,
}) => {
	try {
		const formData = await request.formData();
		formData.append('bodyTypeId', params.bodyTypeId ?? '');
		await putReview(params.reviewId, formData);
		return redirect('/body-types');
	}
	catch (error: any) {
		return getActionError({
			source: formName,
			error,
		});
	}
};

export const ReviewsUpdate = () => {

	const {
		bodyType: { name, model },
	} = useLoaderData() as FormLoaderData<ReviewForm, Data>;

	return (
		<Page
			title='Update Review'
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
