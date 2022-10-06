import {
	ActionFunction,
	LoaderFunction,
	redirect,
	useLoaderData,
} from 'react-router-dom';

import { CreateReview } from 'schemas/review';
import { BodyType } from 'schemas/body-type';
import { getBodyType } from 'endpoints/body-type';
import { createReview } from 'endpoints/review';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';

import { FormField } from 'types/general';

import styles from './body-types-review.module.scss';

export const bodyTypesReviewLoader: LoaderFunction = async ({ params }) => {
	return await getBodyType(params.bodyTypeId);
};

export const bodyTypesReviewAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		await createReview(formData);
		return redirect('/body-types');
	}
	catch (error: any) {
		console.error(error);
		return getActionError({
			source: 'body-types-review',
			error,
		});
	}
};

const baseFields: FormField<CreateReview>[] = [
	{
		fieldType: 'rating',
		name: 'rating',
		required: true,
		interactive: true,
	},
	{
		fieldType: 'textarea',
		name: 'description',
	},
];

export const BodyTypesReview = () => {

	const data = useLoaderData() as BodyType;

	const fields = [...baseFields];
	fields.push({
		name: 'bodyTypeId',
		fieldType: 'input',
		type: 'hidden',
		value: data._id,
	});

	return (
		<Page
			title='Review Body Type'
			hasBack
		>
			<h1
				className={styles['heading']}
			>
				Reviewing {data.model.makeType.name} {data.model.name} {data.name}
			</h1>
			<Form
				page='body-types-review'
				fields={fields}
				noGrid
			/>
		</Page>
	);
};