import { useEffect, useState } from 'react';

import { cx } from 'helpers/class-name';
import omitKey from 'helpers/omit-key';
import { humanizeString } from 'helpers/string';

import { FormFieldProps } from './FormField.types';
import styles from './FormField.module.scss';

const FormField = <Type extends Record<string, any>>({
	className,
	field,
	error,
	size = 'medium',
	disabled,
}: FormFieldProps<Type>) => {

	const [hideError, setHideError] = useState(false);

	useEffect(() => {
		setHideError(false);
	}, [error]);


	const {
		label,
		name,
		description,
	} = field;

	const id = field.id ?? name as string;

	const fieldProps = {
		id,
		name: name as string,
		onChange: (
			error && !hideError
				? () => setHideError(true)
				: undefined
		),
	};

	const fieldElement = (
		field.fieldType === 'input'
			? <input
				{...omitKey(field, 'fieldType')}
				{...fieldProps}
				disabled={disabled ?? field.disabled}
			/>
			: <select
				{...omitKey(field, 'fieldType')}
				{...fieldProps}
				disabled={disabled ?? field.disabled}
			>
				<option
					value=''
					selected
					disabled
					hidden
				>
					-- Select {label ?? humanizeString(name as string)} --
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
			</select>
	);

	return (
		<div
			className={cx(
				styles.field,
				size,
				error && !hideError && styles['error'],
				className
			)}
		>
			<label
				htmlFor={id}
			>
				{label ?? humanizeString(name as string)}
				{field.required &&
					<span
						className={styles.required}
					>
						*
					</span>
				}
			</label>

			{fieldElement}

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