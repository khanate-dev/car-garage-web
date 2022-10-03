import { cx } from 'helpers/class-name';

import { LoadingProps } from './Loading.types';
import styles from './DotWave.module.scss';

const Loading = ({
	size = 'medium',
	color = 'default',
}: LoadingProps) => {

	return (
		<div
			className={cx(
				styles.container,
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