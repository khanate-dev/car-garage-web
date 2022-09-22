import { cx } from 'helpers/class-name';

import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button = ({
	text,
	color = 'default',
	...buttonProps
}: ButtonProps) => (
	<button
		{...buttonProps}
		className={cx(
			buttonProps.className,
			styles[color]
		)}
	>
		{text}
	</button>
);

export default Button;