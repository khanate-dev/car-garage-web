import { useEffect, useReducer } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { UserSansPassword } from 'schemas/user';

import { removeSetting } from 'helpers/settings';
import { deleteRequest } from 'helpers/api';
import { cx } from 'helpers/class-name';

import ThemeSwitch from 'components/ThemeSwitch';
import Logo from 'components/Logo/Logo';
import Avatar from 'components/Avatar';
import Button from 'components/Button';

import styles from './Sidebar.module.scss';

const Sidebar = () => {

	const navigate = useNavigate();
	const user = useLoaderData() as UserSansPassword;

	const [isMinimized, toggleSidebar] = useReducer((prev) => !prev, false);

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
		<aside
			className={cx(
				styles['sidebar'],
				isMinimized && styles['minimized']
			)}
		>

			<header
				className={styles['header']}
			>

				<ThemeSwitch
					size='small'
				/>

				<Button
					className={styles['toggle']}
					onClick={toggleSidebar}
					text='<'
					variant='ghost'
				/>

				<Logo />

				<div className={styles['user-flex']}>

					<Avatar
						alt={user.name}
						size='small'
					/>

					<div className={styles['user-details']}>
						<h5>{user.name}</h5>
						<h5>{user.role}</h5>
					</div>

					<Button
						onClick={logout}
						variant='outline'
						text='Logout'
						size='tiny'
					/>

				</div>

			</header>

		</aside>
	);

};

export default Sidebar;