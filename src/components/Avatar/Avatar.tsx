import { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.scss';
import { cx } from 'helpers/class-name';

const Avatar = ({
	alt,
	size = 'medium',
}: AvatarProps) => {

	return (
		<div
			className={cx(styles.avatar, size)}
		>
			{alt[0]?.toUpperCase()}
		</div>
	);

};

export default Avatar;