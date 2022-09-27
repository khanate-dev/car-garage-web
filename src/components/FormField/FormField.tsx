import { cx } from 'helpers/class-name';

import { FormFieldProps } from './FormField.types';
import styles from './FormField.module.scss';
import omitKey from 'helpers/omit-key';

const FormField = ({
	className,
	field,
	error,
	onErrorReset,
	size = 'medium',
}: FormFieldProps) => {

	const {
		label,
		name,
		description,
	} = field;

	const id = field.id ?? name;

	const fieldProps = {
		id,
		name,
		onChange: error ? onErrorReset : undefined,
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
				styles[size],
				error && styles['error'],
				className
			)}
		>
			<label
				htmlFor={id}
			>
				{label ?? name}
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

			{error &&
				<div
					className={styles['error-text']}
				>
					{error}
				</div>
			}

		</div>
	);

};

export default FormField;