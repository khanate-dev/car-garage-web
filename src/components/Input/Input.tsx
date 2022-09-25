import { InputProps } from './Input.types';
import styles from './Input.module.scss';
import { cx } from 'helpers/class-name';

const Input = ({
	className,
	label,
	name,
	description,
	error,
	onErrorReset,
	size = 'medium',
	...inputProps
}: InputProps) => {

	const id = inputProps.id ?? name;

	return (
		<div
			className={cx(
				styles.input,
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
			<input
				{...inputProps}
				id={id}
				name={name}
				onChange={error ? onErrorReset : undefined}
			/>
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

export default Input;