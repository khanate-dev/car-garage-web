import { cx } from 'helpers/class-name';

import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button = ({
	text,
	color = 'primary',
	size = 'medium',
	icon: Icon,
	variant = 'fill',
	children,
	...buttonProps
}: ButtonProps) => (
	<button
		{...buttonProps}
		className={cx(
			buttonProps.className,
			styles['button'],
			styles[color],
			styles[size],
			styles[variant]
		)}
	>
		{Icon && <Icon />}
		{text ?? children}
	</button>
);

export default Button;