import { Link, ActionFunction, redirect } from 'react-router-dom';

import {
	RegisterRequest,
	registerRequestSchema,
	registerResponseSchema,
} from 'schemas/auth';
import { userRoles } from 'schemas/user';

import { postRequest } from 'helpers/api';

import ThemeSwitch from 'components/ThemeSwitch';
import Form from 'components/Form';

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

	return (
		<main
			className={styles['container']}
		>

			<ThemeSwitch
				className={styles['theme-switch']}
			/>

			<Form
				className={styles['form']}
				page='register'
				title='Car Garage'
				subtitle='Welcome! Register below'
				fields={fields}
				footer={
					<Link
						to='/login'
					>
						Have An Account? Login here
					</Link>
				}
			/>

		</main>
	);

};