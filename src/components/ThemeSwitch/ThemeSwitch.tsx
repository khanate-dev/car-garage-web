import { MoonIcon, SunIcon } from '@primer/octicons-react';

import { useDarkMode } from 'contexts/dark-mode';

import { cx } from 'helpers/class-name';

import IconButton from 'components/IconButton';

import { ThemeSwitchProps } from './ThemeSwitch.types';
import styles from './ThemeSwitch.module.scss';

const ThemeSwitch = ({
	className,
	size = 'medium',
}: ThemeSwitchProps) => {

	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<IconButton
			className={cx(
				isDarkMode ? styles['dark'] : styles['light'],
				className
			)}
			size={size}
			onClick={toggleDarkMode}
			icon={
				<>
					<SunIcon
						className={styles['light-icon']}
					/>
					<MoonIcon
						className={styles['dark-icon']}
					/>
				</>
			}
		/>
	);

};

export default ThemeSwitch;