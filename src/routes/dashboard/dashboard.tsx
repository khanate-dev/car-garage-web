import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { removeSetting } from 'helpers/settings';
import { deleteRequest } from 'helpers/api';

import ThemeSwitch from 'components/ThemeSwitch';

import styles from './dashboard.module.scss';
import Button from 'components/Button';

export const Dashboard = () => {

	const navigate = useNavigate();

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
		<main
			className={styles['main']}
		>

			<h1>
				Car Garage Web App
			</h1>

			<ThemeSwitch />

			<Button
				onClick={logout}
				text='Logout'
			/>

		</main>
	);

};