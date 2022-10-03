import { Link, ActionFunction, Form } from 'react-router-dom';

import useFormError from 'hooks/form-error';

import {
	LoginRequest,
	loginRequestSchema,
	loginResponseSchema,
} from 'schemas/auth';

import { postRequest } from 'helpers/api';
import { setSetting } from 'helpers/settings';
import { getActionError } from 'helpers/route';

import ThemeSwitch from 'components/ThemeSwitch';
import FormField from 'components/FormField';
import Button from 'components/Button';
import Alert from 'components/Alert';

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

	const error = useFormError<LoginRequest>('login');

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
				<p>Welcome! Login below</p>

				{fields.map(field =>
					<FormField
						key={field.name}
						field={field}
						error={error?.errors?.[field.name]}
					/>
				)}

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
					to='/register'
				>
					{'New Here? Register'}
				</Link>

			</Form>

		</main>
	);

};