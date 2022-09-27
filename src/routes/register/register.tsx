import { FormEventHandler } from 'react';
import { LoaderFunction, redirect, useNavigate } from 'react-router-dom';

import useFormError from 'hooks/form-error';

import {
	loginRequestSchema,
	loginResponseSchema,
} from 'schemas/session';
import { userRoles, UserSansMeta } from 'schemas/user';
import FormError from 'errors/form';

import { postRequest } from 'helpers/api';
import { getSetting, setSetting } from 'helpers/settings';

import ThemeSwitch from 'components/ThemeSwitch';
import Button from 'components/Button';
import FormField from 'components/FormField';

import { FormField as FormFieldType } from 'types/general';

import styles from './register.module.scss';
import { Link } from 'react-router-dom';

export const registerLoader: LoaderFunction = async () => {
	const user = getSetting('user');
	if (user) return redirect('/');
	return;
};

const fields: FormFieldType<UserSansMeta>[] = [
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
];

export const Register = () => {

	const navigate = useNavigate();

	const [error, dispatchError] = useFormError<UserSansMeta>();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		try {

			event.preventDefault();

			const formData = new FormData(event.currentTarget);
			const json = loginRequestSchema.parse(Object.fromEntries(formData));

			const response = await postRequest('session', json, true);

			const { user, accessToken, refreshToken } = loginResponseSchema.parse(response);
			setSetting('user', user);
			setSetting('accessToken', accessToken);
			setSetting('refreshToken', refreshToken);

			navigate('/');

		}
		catch (error: any) {
			dispatchError({
				type: 'update',
				value: new FormError(error),
			});
		}
	};

	return (
		<main
			className={styles['container']}
		>

			<ThemeSwitch
				className={styles['theme-switch']}
			/>

			<form
				className={styles['form']}
				onSubmit={handleSubmit}
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
							error={error?.fieldErrors[field.name]}
							onErrorReset={() => {
								dispatchError({
									type: 'remove-field', value: field.name,
								});
							}}
						/>
					)}
				</div>

				{error?.isGeneral &&
					<div
						className={styles['form-error']}
					>
						{error.generalError}
					</div>
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

			</form>

		</main>
	);

};