import { Fragment } from 'react';
import { Form as RouterForm, useNavigation } from 'react-router-dom';

import useFormError from 'hooks/form-error';

import { cx } from 'helpers/class-name';

import FormField from 'components/FormField';
import Alert from 'components/Alert';
import Button from 'components/Button';

import { FormProps } from './Form.types';
import styles from './Form.module.scss';

const Form = ({
	className,
	page,
	title,
	subtitle,
	fields,
	footer,
	noGrid,
	...routerProps
}: FormProps) => {

	const { state } = useNavigation();
	const error = useFormError(page);

	const FormContainer = (
		noGrid
			? Fragment
			: 'div'
	);

	return (
		<RouterForm
			className={cx(
				styles['container'],
				className
			)}
			{...routerProps}
			method={routerProps.method ?? 'post'}
		>

			{title && <h1>{title}</h1>}

			{subtitle && <p>{subtitle}</p>}

			<FormContainer
				className={styles['form-grid']}
			>
				{fields.map(field =>
					<FormField
						key={field.name}
						field={field}
						error={error?.errors?.[field.name]}
					/>
				)}
			</FormContainer>

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
				isLoading={state !== 'idle'}
			/>

			{footer}

		</RouterForm>
	);

};

export default Form;