import { AlertProps } from './Alert.types';
import styles from './Alert.module.scss';
import { cx } from 'helpers/class-name';

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