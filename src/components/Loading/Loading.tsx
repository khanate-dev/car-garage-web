import { cx } from 'helpers/class-name';

import { LoadingProps } from './Loading.types';
import styles from './Loading.module.scss';

const Loading = ({
	size = 'medium',
	color = 'default',
	button,
}: LoadingProps) => {

	return (
		<div
			className={cx(
				styles.container,
				button && styles.inherit,
				size,
				color
			)}
		>
			<div className={styles.dot} />
			<div className={styles.dot} />
			<div className={styles.dot} />
			<div className={styles.dot} />
		</div>
	);

};

export default Loading;