import { Link, ActionFunction, redirect, Form } from 'react-router-dom';

import useFormError from 'hooks/form-error';

import {
	RegisterRequest,
	registerRequestSchema,
	registerResponseSchema,
} from 'schemas/auth';
import { userRoles } from 'schemas/user';

import { postRequest } from 'helpers/api';

import ThemeSwitch from 'components/ThemeSwitch';
import Button from 'components/Button';
import FormField from 'components/FormField';
import Alert from 'components/Alert';

import { FormField as FormFieldType } from 'types/general';

import styles from './register.module.scss';
import { getActionError } from 'helpers/route';

const fields: FormFieldType<RegisterRequest>[] = [
	{
		fieldType: 'input',
		name: 'name',
		type: 'input',
		required: true,
	},
	{
		fieldType: 'input',
		name: 'email',
		type: 'email',
		required: true,
	},
	{
		fieldType: 'input',
		name: 'phoneNumber',
		type: 'phone',
		required: true,
	},
	{
		fieldType: 'select',
		name: 'role',
		required: true,
		options: userRoles as any,
	},
	{
		fieldType: 'input',
		name: 'password',
		type: 'password',
		description: 'Must be at least 6 characters',
		required: true,
	},
	{
		fieldType: 'input',
		name: 'passwordConfirmation',
		type: 'password',
		required: true,
	},
];

export const registerAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		const json = registerRequestSchema.parse(Object.fromEntries(formData));

		const response = await postRequest('user', json, true);
		registerResponseSchema.parse(response);

		return redirect('/login');
	}
	catch (error: any) {
		return getActionError({
			source: 'register',
			error,
		});
	}
};

export const Register = () => {

	const error = useFormError<RegisterRequest>('register');

	return (
		<main
			className={styles['container']}
		>

			<ThemeSwitch
				className={styles['theme-switch']}
			/>

			<Form
				method='post'
				className={styles['form']}
			>

				<h1>Car Garage</h1>
				<p>Welcome! Register below</p>

				<div
					className={styles['fields']}
				>
					{fields.map(field =>
						<FormField
							key={field.name}
							field={field}
							error={error?.errors?.[field.name]}
						/>
					)}
				</div>

				{error.type === 'general' &&
					<Alert
						message={error.message}
						size='small'
						color='danger'
					/>
				}

				<Button
					text='Submit'
					type='submit'
				/>

				<Link
					to='/login'
				>
					Have An Account? Login here
				</Link>

			</Form>

		</main>
	);

};