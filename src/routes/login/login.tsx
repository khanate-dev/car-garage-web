import { Link, ActionFunction } from 'react-router-dom';

import { LoginRequest } from 'schemas/auth';
import { createSession } from 'endpoints/session';

import { setSetting } from 'helpers/settings';
import { getActionError } from 'helpers/route';

import ThemeSwitch from 'components/ThemeSwitch';
import Form from 'components/Form';

import { FormField as FormFieldType } from 'types/general';

import styles from './login.module.scss';
import Logo from 'components/Logo/Logo';

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
		const session = await createSession(formData);
		setSetting('user', session.user);
		setSetting('accessToken', session.accessToken);
		setSetting('refreshToken', session.refreshToken);
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
				title={<Logo />}
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
