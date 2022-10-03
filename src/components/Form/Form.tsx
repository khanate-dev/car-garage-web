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

import { FormProps } from './Form.types';
import styles from './Form.module.scss';
import { SelectOptions } from 'types/general';

const Form = <Type extends Record<string, any>>({
	className,
	page,
	title,
	subtitle,
	fields,
	footer,
	noGrid,
	...routerProps
}: FormProps<Type>) => {

	const { state } = useNavigation();
	const options = useLoaderData() as Record<keyof Type, SelectOptions>;
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
				{...formContainerProps}
			>
				{fields.map(field => {

					if (
						field.fieldType === 'select'
						&& Array.isArray(options?.[field.name])
					) {
						field.options = options?.[field.name];
					}

					return <FormField
						key={field.name as string}
						field={field}
						error={error?.errors?.[field.name as string]}
						disabled={state !== 'idle'}
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