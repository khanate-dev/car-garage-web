import { Link, ActionFunction } from 'react-router-dom';

import {
	LoginRequest,
	loginRequestSchema,
	loginResponseSchema,
} from 'schemas/auth';

import { postRequest } from 'helpers/api';
import { setSetting } from 'helpers/settings';
import { getActionError } from 'helpers/route';

import ThemeSwitch from 'components/ThemeSwitch';
import Form from 'components/Form';

import { FormField as FormFieldType } from 'types/general';

import styles from './login.module.scss';

const fields: FormFieldType<LoginRequest>[] = [
	{
		fieldType: 'input',
		name: 'email',
		type: 'email',
		required: true,
	},
	{
		fieldType: 'input',
		name: 'password',
		type: 'password',
		description: 'Must be at least 6 characters',
		required: true,
	},
];

export const loginAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		const json = loginRequestSchema.parse(Object.fromEntries(formData));

		const response = await postRequest('session', json, true);

		const {
			user,
			accessToken,
			refreshToken,
		} = loginResponseSchema.parse(response);

		setSetting('user', user);
		setSetting('accessToken', accessToken);
		setSetting('refreshToken', refreshToken);
		return null;
	}
	catch (error: any) {
		return getActionError({
			source: 'login',
			error,
		});
	}
};

export const Login = () => {


	return (
		<main
			className={styles['container']}
		>

			<ThemeSwitch
				className={styles['theme-switch']}
			/>

			<Form
				className={styles['form']}
				page='login'
				title='Car Garage'
				subtitle='Welcome! Login below'
				fields={fields}
				footer={
					<Link
						to='/register'
					>
						{'New Here? Register'}
					</Link>
				}
				noGrid
			/>

		</main >
	);

};