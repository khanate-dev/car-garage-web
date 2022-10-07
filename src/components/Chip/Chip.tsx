import { cx } from 'helpers/class-name';

import { ChipProps } from './Chip.types';
import styles from './Chip.module.scss';

const Chip = ({
	title,
	color = 'default',
	size = 'medium',
}: ChipProps) => {

	return (
		<div
			className={cx(
				styles['chip'],
				color,
				size
			)}
		>
			{title}
		</div>
	);

};

export default Chip;
