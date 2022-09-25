import Button, { buttonSizes, buttonVariants } from 'components/Button';
import { useDarkMode } from 'contexts/dark-mode';

import { ReactComponent as Logo } from 'logo.svg';
import { themeColors } from 'types/general';

import styles from './dashboard.module.scss';

const Dashboard = () => {

	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<main>

			<h1>
				Car Garage Web App
			</h1>

			<Button
				onClick={(event) => {
					toggleDarkMode();
					event.currentTarget.blur();
				}}
				text={`Switch To: ${isDarkMode ? 'Light' : 'Dark'}`}
				color='primary'
				icon={Logo}
			/>

			<input type='checkbox' />
			<div className={styles['flex']}>
				<input name='radio' type='radio' />
				<input name='radio' type='radio' />
			</div>
			<input type='range' />
			<progress></progress>

			<div className={styles['flex']}>
				{buttonSizes.map(size =>
					<Button
						key={size}
						color='primary'
						variant='fill'
						size={size}
						text='Click Me!'
						icon={Logo}
					/>
				)}
			</div>

			<div className={styles['button-showcase']}>
				{buttonVariants.map(variant =>
					themeColors.map(color =>
						<Button
							key={`${variant}-${color}`}
							color={color}
							variant={variant}
							text='Click Me!'
							icon={Logo}
						/>
					)
				)}
			</div>

		</main>
	);

};

export default Dashboard;