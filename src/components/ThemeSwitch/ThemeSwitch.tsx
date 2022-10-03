import { useDarkMode } from 'contexts/dark-mode';

import { cx } from 'helpers/class-name';

import IconButton from 'components/IconButton';

import { ReactComponent as LightModeIcon } from 'icons/light-mode.svg';
import { ReactComponent as DarkModeIcon } from 'icons/dark-mode.svg';

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
					<LightModeIcon
						className={styles['light-icon']}
					/>
					<DarkModeIcon
						className={styles['dark-icon']}
					/>
				</>
			}
		/>
	);

};

export default ThemeSwitch;