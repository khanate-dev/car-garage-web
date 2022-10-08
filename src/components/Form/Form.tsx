import { Fragment } from 'react';
import {
	Form as RouterForm,
	useLoaderData,
	useNavigation,
} from 'react-router-dom';

import useFormError from 'hooks/form-error';

import { cx } from 'helpers/class-name';

import FormField from 'components/FormField';
import Alert from 'components/Alert';
import Button from 'components/Button';

import { FormLoaderData } from 'types/general';

import { FormProps } from './Form.types';
import styles from './Form.module.scss';

const Form = <Type extends Record<string, any>>({
	className,
	page,
	title,
	subtitle,
	fields,
	footer,
	submitProps,
	noGrid,
	disabled,
	busy,
	noSubmitButton,
	...routerProps
}: FormProps<Type>) => {

	const { state } = useNavigation();
	const options = useLoaderData() as FormLoaderData<Type>;
	const error = useFormError(page, fields);

	const FormContainer = (
		noGrid
			? Fragment
			: 'div'
	);
	const formContainerProps = {
		className: !noGrid ? styles['form-grid'] : undefined,
	};
	if (noGrid) delete formContainerProps.className;

	return (
		<RouterForm
			id={page}
			className={cx(
				styles['container'],
				className
			)}
			{...routerProps}
			method={routerProps.method ?? 'post'}
		>

			{title && (
				typeof title === 'object'
					? title
					: <h1>{title}</h1>
			)}

			{subtitle && (
				typeof subtitle === 'object'
					? subtitle
					: <p>{subtitle}</p>
			)}

			<FormContainer
				{...formContainerProps}
			>
				{fields.map(field => {

					if (
						field.fieldType === 'select'
						&& !field.options
						&& Array.isArray(options?.[field.name]?.options)
					) {
						field.options = options[field.name].options;
					}
					field.defaultValue = options?.[field.name]?.value;

					return <FormField
						key={field.id ?? field.name as string}
						field={field}
						error={error?.errors?.[field.name as string]}
						disabled={busy || disabled || state !== 'idle'}
					/>;

				})}
			</FormContainer>

			{error.type === 'general' &&
				<Alert
					message={error.message}
					size='small'
					color='danger'
				/>
			}

			{!noSubmitButton &&
				<Button
					text={'Submit'}
					type='submit'
					icon='submit'
					isLoading={busy || state !== 'idle'}
					{...submitProps}
				/>
			}

			{footer}

		</RouterForm>
	);

};

export default Form;
