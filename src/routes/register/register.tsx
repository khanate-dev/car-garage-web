import { FormEventHandler } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import useFormError from 'hooks/form-error';

import {
	RegisterRequest,
	registerRequestSchema,
	registerResponseSchema,
} from 'schemas/auth';
import { userRoles } from 'schemas/user';
import FormError from 'errors/form';

import { postRequest } from 'helpers/api';

import ThemeSwitch from 'components/ThemeSwitch';
import Button from 'components/Button';
import FormField from 'components/FormField';
import Alert from 'components/Alert';

import { FormField as FormFieldType } from 'types/general';

import styles from './register.module.scss';

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

export const Register = () => {

	const navigate = useNavigate();

	const [error, dispatchError] = useFormError<RegisterRequest>();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		try {
			event.preventDefault();

			const formData = new FormData(event.currentTarget);
			const json = registerRequestSchema.parse(Object.fromEntries(formData));

			const response = await postRequest('user', json, true);
			registerResponseSchema.parse(response);

			navigate('/login');

		}
		catch (error: any) {
			console.error(error);
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
					<Alert
						message={error.generalError}
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

			</form>

		</main>
	);

};