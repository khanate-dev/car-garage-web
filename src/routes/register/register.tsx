import { FormEventHandler, useReducer } from 'react';
import { LoaderFunction, redirect, useNavigate } from 'react-router-dom';

import {
	loginRequestSchema,
	loginResponseSchema,
} from 'schemas/session';
import { UserSansMeta } from 'schemas/user';
import FormError from 'errors/form';

import { postRequest } from 'helpers/api';
import { getSetting, setSetting } from 'helpers/settings';

import ThemeSwitch from 'components/ThemeSwitch';
import Input, { InputProps } from 'components/Input';
import Button from 'components/Button';

import styles from './register.module.scss';

export const registerLoader: LoaderFunction = async () => {
	const user = getSetting('user');
	if (user) return redirect('/');
	return;
};

type ErrorReducerAction = (
	| { type: 'reset', }
	| { type: 'remove-field', value: (keyof UserSansMeta) | (keyof UserSansMeta)[], }
	| { type: 'update', value: FormError<UserSansMeta>, }
);

const errorReducer = (
	prev: null | FormError<UserSansMeta>,
	action: ErrorReducerAction
): null | FormError<UserSansMeta> => {
	switch (action.type) {
		case 'remove-field': {
			if (!prev) return null;
			const fieldsToRemove = (
				Array.isArray(action.value)
					? action.value
					: [action.value]
			);
			fieldsToRemove.forEach(field =>
				delete prev.fieldErrors[field]
			);
			return new FormError(prev.fieldErrors);
		}
		case 'update':
			return action.value;
		case 'reset':
			return null;
		default:
			throw new Error('Invalid action type');
	}
};

const inputs: InputProps[] = [
	{
		name: 'email',
		type: 'email',
		required: true,
	},
	{
		name: 'phoneNumber',
		type: 'phone',
		required: true,
	},
	{
		name: 'password',
		type: 'password',
		description: 'Must be at least 6 characters',
		required: true,
	},
];

export const Login = () => {

	const navigate = useNavigate();

	const [error, dispatchError] = useReducer(errorReducer, null);

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

				<Input
					name='email'
					type='email'
					error={error?.fieldErrors.email}
					onErrorReset={() => {
						dispatchError({
							type: 'remove-field', value: 'email',
						});
					}}
					required
				/>

				<Input
					name='password'
					type='password'
					error={error?.fieldErrors.password}
					onErrorReset={() => {
						dispatchError({
							type: 'remove-field', value: 'password',
						});
					}}
					description='Must be at least 6 characters'
					required
				/>

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

			</form>
		</main>
	);

};