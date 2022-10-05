
import { useDarkMode } from 'contexts/dark-mode';

import { cx } from 'helpers/class-name';

import IconButton from 'components/IconButton';
import { darkModeIcon, lightModeIcon } from 'components/icons';

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
					{lightModeIcon}
					{darkModeIcon}
				</>
			}
		/>
	);

};

export default ThemeSwitch;