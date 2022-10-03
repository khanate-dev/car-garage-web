import { useReducer } from 'react';
import {
	ActionFunction,
	Form,
	LoaderFunction,
	useLoaderData,
} from 'react-router-dom';

import useFormError from 'hooks/form-error';

import {
	MakeType,
	MakeTypeSansMeta,
	makeTypeSansMetaModelSchema,
} from 'schemas/make-type';
import { getMakeTypes } from 'endpoints/make-type';

import { postRequest } from 'helpers/api';
import { getActionError } from 'helpers/route';

import Page from 'components/Page';
import Card from 'components/Card';
import Button from 'components/Button';
import FormField from 'components/FormField';
import Alert from 'components/Alert';

import { FormField as FormFieldType } from 'types/general';

import styles from './make-types.module.scss';

export const makeTypesLoader: LoaderFunction = getMakeTypes;

export const makeTypesAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		const body = makeTypeSansMetaModelSchema.parse(Object.fromEntries(formData));
		await postRequest('make-type', body);
		return null;
	}
	catch (error: any) {
		return getActionError({
			source: 'make-types',
			error,
		});
	}
};

const field: FormFieldType<MakeTypeSansMeta> = {
	fieldType: 'input',
	name: 'name',
	required: true,
};

export const MakeTypes = () => {

	const error = useFormError<MakeTypeSansMeta>('make-types', []);
	const [isAdding, toggleIsAdding] = useReducer((prev) => !prev, false);

	const makeTypes = useLoaderData() as MakeType[];

	return (
		<Page
			title='Make Types'
			isEmpty={makeTypes.length === 0}
		>

			{isAdding &&
				<Form
					method='post'
					className={styles['form']}
				>

					<FormField
						field={field}
						error={error.errors?.name}
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

			{makeTypes.length > 0 &&
				<div
					className={styles['grid']}
				>
					{makeTypes.map(({ _id, name }) =>
						<Card
							key={_id}
							title={name}
						/>
					)}
				</div>
			}
		</Page>
	);

};
