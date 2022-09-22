import { useEffect, useState } from 'react';

import usePrefersDarkMode from 'hooks/prefers-dark-mode';

import Providers from 'components/app/Providers';

import styles from './App.module.scss';
import 'theme/theme.scss';

import logo from './logo.svg';

function App() {

	const prefersDarkMode = usePrefersDarkMode();

	const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

	useEffect(() => {
		setIsDarkMode(prefersDarkMode);
		const rootElement = document.getElementById('root');
		if (prefersDarkMode) {
			rootElement?.classList.add('dark');
		}
		else {
			rootElement?.classList.remove('dark');
		}
	}, [prefersDarkMode]);

	return (
		<Providers {...{
			isDarkMode,
			setIsDarkMode,
		}}>
			<div className={styles['app']}>
				<header className={styles['app-header']}>
					<img src={logo} className={styles['app-logo']} alt="logo" />
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
				</header>
			</div>
		</Providers>
	);
}

export default App;
