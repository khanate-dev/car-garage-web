import { useEffect, useState } from 'react';

import { cx } from 'helpers/class-name';
import omitKey from 'helpers/omit-key';
import { humanizeString } from 'helpers/string';

import { FormFieldProps } from './FormField.types';
import styles from './FormField.module.scss';

const FormField = ({
	className,
	field,
	error,
	size = 'medium',
}: FormFieldProps) => {

	const [hideError, setHideError] = useState(false);

	useEffect(() => {
		setHideError(false);
	}, [error]);


	const {
		label,
		name,
		description,
	} = field;

	const id = field.id ?? name;

	const fieldProps = {
		id,
		name,
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
			/>
			: <select
				{...omitKey(field, 'fieldType')}
				{...fieldProps}
			>
				{field.options.map(option => {
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
				{label ?? humanizeString(name)}
				<span
					className={styles.required}
				>
					*
				</span>
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