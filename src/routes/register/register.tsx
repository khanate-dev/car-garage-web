import { Link, ActionFunction, redirect } from 'react-router-dom';

import { RegisterRequest } from 'schemas/auth';
import { userRoles } from 'schemas/user';
import { createUser } from 'endpoints/user';

import { getActionError } from 'helpers/route';

import ThemeSwitch from 'components/ThemeSwitch';
import Form from 'components/Form';

import { FormField as FormFieldType } from 'types/general';

import styles from './register.module.scss';
import Logo from 'components/Logo/Logo';

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
		await createUser(formData);
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
				title={<Logo />}
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