import { useEffect } from 'react';
import { LoaderFunction, redirect, useNavigate } from 'react-router-dom';

import { useDarkMode } from 'contexts/dark-mode';

import { getSetting, removeSetting } from 'helpers/settings';
import { deleteRequest } from 'helpers/api';

import Button from 'components/Button';

import { ReactComponent as Logo } from 'logo.svg';

import styles from './dashboard.module.scss';

export const dashboardLoader: LoaderFunction = async () => {
	const user = getSetting('user');
	if (!user) {
		return redirect('/login');
	}
	return;
};

export const Dashboard = () => {

	const navigate = useNavigate();

	const { isDarkMode, toggleDarkMode } = useDarkMode();

	const logout = async () => {
		await deleteRequest('session');
		removeSetting('user');
		removeSetting('accessToken');
		removeSetting('refreshToken');
		navigate('/login');
	};

	useEffect(() => {
		window.addEventListener('invalidate-user', logout);
		return () => {
			window.removeEventListener('invalidate-user', logout);
		};
	}, []);

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

			<Button
				text='Logout'
				onClick={logout}
			/>

		</main>
	);

};