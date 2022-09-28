import { cx } from 'helpers/class-name';

import { LogoProps } from './Logo.types';
import styles from './Logo.module.scss';

const Logo = ({
	className,
	size = 'medium',
}: LogoProps) => {

	return (
		<h1
			className={cx(
				className,
				styles['logo'],
				size
			)}
		>
			Car Garage
		</h1>
	);

};

export default Logo;