import { useReducer } from 'react';
import {
	ActionFunction,
	Form,
	LoaderFunction,
	useLoaderData,
} from 'react-router-dom';

import useFormError from 'hooks/form-error';

import {
	BodyType,
	BodyTypeSansMeta,
	createBodyTypeSchema,
} from 'schemas/body-type';

import { Model } from 'schemas/model';
import { loadBodyTypes } from 'endpoints/body-type';
import { fetchModels } from 'endpoints/model';

import { postRequest } from 'helpers/api';
import { getActionError } from 'helpers/route';
import { humanizeString } from 'helpers/string';

import Page from 'components/Page';
import Card from 'components/Card';
import Button from 'components/Button';
import FormField from 'components/FormField';
import Alert from 'components/Alert';

import { FormField as FormFieldType } from 'types/general';

import styles from './body-types.module.scss';


export const bodyTypesLoader: LoaderFunction = async () => {
	return [(await loadBodyTypes()), (await fetchModels())];
};

export const bodyTypesAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		const body = createBodyTypeSchema.parse(Object.fromEntries(formData));
		await postRequest('body-type', body);
		return null;
	}
	catch (error: any) {
		console.error(error);
		return getActionError({
			source: 'body-types',
			error,
		});
	}
};

const nameField: FormFieldType<BodyTypeSansMeta> = {
	fieldType: 'input',
	name: 'name',
	required: true,
};


const modelField: FormFieldType<BodyTypeSansMeta> = {
	fieldType: 'select',
	name: 'modelId',
	required: true,
	options: [],
};


export const BodyTypes = () => {

	const error = useFormError<BodyTypeSansMeta>('body-types');
	const [isAdding, toggleIsAdding] = useReducer((prev) => !prev, false);

	const [bodyTypes, models] = useLoaderData() as [BodyType[], Model[]];

	return (
		<Page
			title='Body Types'
			isEmpty={bodyTypes.length === 0}
		>

			{isAdding &&
				<Form
					method='post'
					className={styles['form']}
				>

					<FormField
						field={nameField}
						error={error.errors?.name}
					/>

					<FormField
						field={{
							...modelField,
							options: models.map(model => ({
								label: `${model.year} ${model.name}`,
								value: model._id,
							})),
						}}
						error={error.errors?.modelId}
					/>

					{error.type === 'general' &&
						<Alert
							message={error.message}
							color='danger'
						/>
					}

					<Button
						text='Add'
						color='primary'
						type={'submit'}
					/>

				</Form>
			}

			<div className={styles['form']}>
				<Button
					text={!isAdding ? 'Add New' : 'Hide'}
					color='primary'
					onClick={toggleIsAdding}
				/>
			</div>

			{bodyTypes.length > 0 &&
				<div
					className={styles['grid']}
				>
					{bodyTypes.map(({ _id, name, model }) =>
						<Card
							key={_id}
							title={name}
							labels={[
								{
									title: `Model: ${`${model.year} ${model.name}`}`,
									color: 'secondary',
								},
								{
									title: `Make Type: ${humanizeString(model.makeType.name)}`,
									color: 'info',
								},
							]}
						/>
					)}
				</div>
			}
		</Page>
	);

};
