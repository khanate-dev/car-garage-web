import { cx } from 'helpers/class-name';

import { AlertProps } from './Alert.types';
import styles from './Alert.module.scss';

const Alert = ({
	className,
	message,
	color = 'default',
	size = 'medium',
}: AlertProps) => {

	return (
		<div
			className={cx(
				styles['alert'],
				color,
				size,
				className
			)}
		>
			{message}
		</div>
	);

};

export default Alert;