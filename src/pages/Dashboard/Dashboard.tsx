import Button from 'components/Button';
import { useDarkMode } from 'contexts/dark-mode';

import { ReactComponent as Logo } from 'logo.svg';

import styles from './Dashboard.module.scss';

const Dashboard = () => {

	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<main>

			<Logo className={styles['app-logo']} />

			<p>
				Edit <code>src/App.tsx</code> and save to reload.
			</p>

			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>

			<Button
				onClick={(event) => {
					toggleDarkMode();
					event.currentTarget.blur();
				}}
				text={`Switch To: ${isDarkMode ? 'Dark' : 'Light'}`}
				color='primary'
			/>

		</main>
	);

};

export default Dashboard;