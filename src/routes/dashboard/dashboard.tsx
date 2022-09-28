import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { removeSetting } from 'helpers/settings';
import { deleteRequest } from 'helpers/api';

import ThemeSwitch from 'components/ThemeSwitch';

import styles from './dashboard.module.scss';
import Button from 'components/Button';
import { UserSansPassword } from 'schemas/user';
import Avatar from 'components/Avatar';

export const Dashboard = () => {

	const navigate = useNavigate();
	const user = useLoaderData() as UserSansPassword;

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

			<header
				className={styles['header']}
			>
				<h1>
					Car Garage Web App
				</h1>

				<ThemeSwitch />

				<Avatar
					alt={user.name}
				/>
				<div className={styles['user-details']}>
					<h5>{user.name}</h5>
					<h6>{user.role}</h6>
				</div>
				<Button
					onClick={logout}
					text='Logout'
					size='small'
				/>
			</header>

		</main>
	);

};