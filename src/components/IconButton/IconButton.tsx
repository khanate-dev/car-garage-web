import { cx } from 'helpers/class-name';

import { IconButtonProps } from './IconButton.types';
import styles from './IconButton.module.scss';

const ThemeSwitch = ({
	className,
	icon,
	size = 'medium',
	corners = 'rounded',
	onClick,
	variant = 'outline',
	color = 'primary',
	...buttonProps
}: IconButtonProps) => (
	<button
		{...buttonProps}
		className={cx(
			styles['button'],
			size,
			corners,
			styles[variant],
			color,
			className
		)}
		onClick={(event) => {
			event.currentTarget.blur();
			onClick?.(event);
		}}
	>
		{icon}
	</button>
);

export default ThemeSwitch;