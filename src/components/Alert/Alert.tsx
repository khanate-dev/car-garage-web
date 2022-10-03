import { cx } from 'helpers/class-name';

import { AlertProps } from './Alert.types';
import styles from './Alert.module.scss';

const Alert = ({
	message,
	color = 'default',
	size = 'medium',
}: AlertProps) => {

	return (
		<div
			className={cx(
				styles['alert'],
				color,
				size
			)}
		>
			{message}
		</div>
	);

};

export default Alert;