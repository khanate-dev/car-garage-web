import { FormEventHandler, useReducer } from 'react';
import { LoaderFunction, redirect, useNavigate } from 'react-router-dom';

import {
	LoginRequest,
	loginRequestSchema,
	loginResponseSchema,
} from 'schemas/session';
import FormError from 'errors/form';

import { postRequest } from 'helpers/api';
import { getSetting, setSetting } from 'helpers/settings';

import ThemeSwitch from 'components/ThemeSwitch';
import Input from 'components/Input';
import Button from 'components/Button';

import styles from './login.module.scss';

export const loginLoader: LoaderFunction = async () => {
	const user = getSetting('user');
	if (user) return redirect('/');
	return;
};

type ErrorReducerAction = (
	| { type: 'reset', }
	| { type: 'remove-field', value: (keyof LoginRequest) | (keyof LoginRequest)[], }
	| { type: 'update', value: FormError<LoginRequest>, }
);

const errorReducer = (
	prev: null | FormError<LoginRequest>,
	action: ErrorReducerAction
): null | FormError<LoginRequest> => {
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
				<p>Welcome! Login below</p>

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