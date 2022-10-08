import { cx } from 'helpers/class-name';

import Loading from 'components/Loading';
import { AppIcon } from 'components/icons';

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
	isLoading,
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
		{isLoading
			? <Loading size='tiny' button />
			: typeof icon === 'string'
				? <AppIcon icon={icon} />
				: icon
		}
	</button>
);

export default ThemeSwitch;
