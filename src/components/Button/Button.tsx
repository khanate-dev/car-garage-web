import { cx } from 'helpers/class-name';

import Loading from 'components/Loading';
import { AppIcon } from 'components/icons';

import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const Button = ({
	text,
	color = 'primary',
	size = 'medium',
	icon,
	variant = 'fill',
	children,
	onClick,
	isLoading,
	...buttonProps
}: ButtonProps) => (
	<button
		{...buttonProps}
		className={cx(
			buttonProps.className,
			styles['button'],
			color,
			size,
			styles[variant]
		)}
		onClick={event => {
			event.currentTarget.blur();
			onClick?.(event);
		}}
	>
		{isLoading
			? <Loading button />
			: <>
				<AppIcon icon={icon} />
				{text ?? children}
			</>
		}
	</button>
);

export default Button;