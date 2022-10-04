import { useEffect, useState } from 'react';

import { cx } from 'helpers/class-name';
import { omitKey } from 'helpers/omit-key';
import { humanizeString } from 'helpers/string';

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
				{...commonProps}
				disabled={disabled ?? field.disabled}
			/>
			: <select
				{...omitKey(field, 'fieldType')}
				{...commonProps}
				defaultValue=''
				disabled={disabled ?? field.disabled}
			>
				<option
					value=''
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

	const labelContent = (
		<>
			{label ?? humanizeString(name as string)}
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