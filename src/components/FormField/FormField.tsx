import { useEffect, useState } from 'react';

import { cx } from 'helpers/class-name';
import { omitKey } from 'helpers/omit-key';
import { humanizeToken } from 'helpers/string';

import Rating from 'components/Rating';

import { FormFieldProps } from './FormField.types';
import styles from './FormField.module.scss';

const FormField = <Type extends Record<string, any>>({
	className,
	field: {
		name,
		label,
		description,
		...field
	},
	error,
	size = 'medium',
	disabled,
}: FormFieldProps<Type>) => {

	const [hideError, setHideError] = useState(false);

	useEffect(() => {
		setHideError(false);
	}, [error]);

	const id = field.id ?? name as string;

	const commonProps = {
		id,
		name: name as string,
		value: field.value !== undefined && field.onChange ? field.value : undefined,
		defaultValue: field.value && field.onChange ? undefined : field.defaultValue ?? '',
		onChange: (event: any) => {
			if (error && !hideError) setHideError(true);
			field.onChange?.(event);
		},
	};

	if (
		field.fieldType === 'input'
		&& field.type === 'hidden'
	) {
		return (
			<input
				type='hidden'
				name={name as string}
				id={id}
				defaultValue={field.value ?? field.defaultValue}
			/>
		);
	}

	let fieldElement;
	switch (field.fieldType) {

		case 'rating':
			fieldElement = <Rating
				{...omitKey(field, 'fieldType')}
				className={field.className}
				name={name}
				id={field.id ?? name as string}
				value={field.value !== undefined && field.onChange ? field.value : undefined}
				defaultValue={field.value && field.onChange ? undefined : field.defaultValue}
				onChange={(event: any) => {
					if (error && !hideError) setHideError(true);
					field.onChange?.(event);
				}}
				interactive
			/>; break;

		case 'input':
			fieldElement = <input
				{...omitKey(field, 'fieldType')}
				{...commonProps}
				disabled={disabled ?? field.disabled}
			/>; break;

		case 'select':
			fieldElement = <select
				{...omitKey(field, 'fieldType')}
				{...commonProps}
				disabled={disabled ?? field.disabled}
			>
				<option
					value=''
					disabled
				>
					-- Select {label ?? humanizeToken(name as string)} --
				</option>
				{(field.options ?? []).map(option => {
					const value = (
						typeof option === 'string'
							? option
							: option.value
					);
					const label = (
						typeof option === 'string'
							? option
							: option.label
					);
					return (
						<option
							key={value}
							value={value}
						>
							{label}
						</option>
					);
				})}
			</select>; break;

		case 'textarea':
			fieldElement = <textarea
				{...omitKey(field, 'fieldType')}
				{...commonProps}
				disabled={disabled ?? field.disabled}
				rows={7}
				wrap='off'
			/>; break;

	}

	const labelContent = (
		<>
			{label ?? humanizeToken(name as string)}
			{field.required &&
				<span
					className={styles.required}
				>
					*
				</span>
			}
		</>
	);

	const isCheck = (
		field.fieldType === 'input'
		&& field.type
		&& ['checkbox', 'radio'].includes(field.type)
	);

	return (
		<div
			className={cx(
				styles.field,
				size,
				error && !hideError && styles['error'],
				isCheck && styles['check'],
				className
			)}
		>

			{isCheck &&
				<label
					htmlFor={id}

					className={styles['check-container']}
				>
					{fieldElement}
					<span>
						{labelContent}
					</span>
				</label>
			}
			{!isCheck &&
				<>
					<label
						htmlFor={id}
					>
						{labelContent}
					</label>
					{fieldElement}
				</>
			}

			{description &&
				<div
					className={styles['description-text']}
				>
					{description}
				</div>
			}

			{error && !hideError &&
				<div
					className={styles['error-text']}
				>
					{error.message}
				</div>
			}

		</div>
	);

};

export default FormField;
