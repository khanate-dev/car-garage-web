import { ActionFunction, Form, LoaderFunction, useLoaderData } from 'react-router-dom';
import { z } from 'zod';

import useFormError from 'hooks/form-error';

import {
	Model,
	modelModelSchema,
	ModelSansMeta,
	modelSansMetaModelSchema,
} from 'schemas/model';

import { getRequest, postRequest } from 'helpers/api';

import Page from 'components/Page';
import Card from 'components/Card';

import styles from './model.module.scss';
import Button from 'components/Button';
import { useReducer } from 'react';
import FormField from 'components/FormField';
import { FormField as FormFieldType } from 'types/general';
import { getActionError } from 'helpers/route';
import Alert from 'components/Alert';
import { humanizeString } from 'helpers/string';
import { loadMakeTypes } from 'helpers/make-type';
import { MakeType } from 'schemas/make-type';

export const modelsLoader: LoaderFunction = async () => {
	const models = await getRequest('model');
	const makeTypes = await loadMakeTypes();
	return [z.array(modelModelSchema).parse(models), makeTypes];
};

export const modelsAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		const formDataObject = Object.fromEntries(formData);
		const body = modelSansMetaModelSchema.parse({
			...formDataObject,
			year: parseInt(formDataObject.year as string),
		});
		await postRequest('model', body);
		return null;
	}
	catch (error: any) {
		console.error(error);
		return getActionError({
			source: 'make-types',
			error,
		});
	}
};

const nameField: FormFieldType<ModelSansMeta> = {
	fieldType: 'input',
	name: 'name',
	required: true,
};

const yearField: FormFieldType<ModelSansMeta> = {
	fieldType: 'input',
	type: 'number',
	name: 'year',
	required: true,
};

const makeTypeField: FormFieldType<ModelSansMeta> = {
	fieldType: 'select',
	name: 'makeTypeId',
	required: true,
	options: [],
};

export const Models = () => {

	const error = useFormError<ModelSansMeta>('models');
	const [isAdding, toggleIsAdding] = useReducer((prev) => !prev, false);

	const [models, makeTypes] = useLoaderData() as [Model[], MakeType[]];

	return (
		<Page
			title='Model'
			isEmpty={models.length === 0}
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
						field={yearField}
						error={error.errors?.year}
					/>

					<FormField
						field={{
							...makeTypeField,
							options: makeTypes.map(makeType => ({
								label: makeType.name,
								value: makeType._id,
							})),
						}}
						error={error.errors?.makeTypeId}
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

			{models.length > 0 &&
				<div
					className={styles['grid']}
				>
					{models.map(({ _id, name, makeType }) =>
						<Card
							key={_id}
							title={name}
							labels={[{
								title: `Make Type: ${humanizeString(makeType.name)}`,
								color: 'info',
							}]}
						/>
					)}
				</div>
			}
		</Page>
	);

};
