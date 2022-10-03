import { useReducer } from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import {
	ChevronLeftIcon as BackIcon,
	SignOutIcon as LogoutIcon,
} from '@primer/octicons-react';

import { UserSansPassword } from 'schemas/user';

import { cx } from 'helpers/class-name';

import ThemeSwitch from 'components/ThemeSwitch';
import Logo from 'components/Logo/Logo';
import Avatar from 'components/Avatar';
import IconButton from 'components/IconButton';

import styles from './Sidebar.module.scss';
import { SidebarProps } from './Sidebar.types';
import { dashboardRoutes } from 'App';

const Sidebar = ({
	onLogout,
}: SidebarProps) => {

	const user = useLoaderData() as UserSansPassword;

	const [isMinimized, toggleSidebar] = useReducer((prev) => !prev, false);

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

				<Logo
					className={styles['logo']}
					isSmall={isMinimized}
				/>

				<div
					className={cx(
						styles['controls'],
						'flex',
						isMinimized && 'column'
					)}
				>
					<ThemeSwitch
						size='small'
					/>

					<IconButton
						className={cx(
							isMinimized && styles['flipped']
						)}
						onClick={toggleSidebar}
						icon={<BackIcon />}
						size='small'
					/>
				</div>

				<div
					className={cx(
						styles['user-flex'],
						isMinimized && styles['column']
					)}
				>

					<Avatar
						alt={user.name}
						size='small'
					/>

					{!isMinimized &&
						<div className={styles['user-details']}>
							<h5>{user.name}</h5>
							<h5>{user.role}</h5>
						</div>
					}

					<IconButton
						onClick={onLogout}
						color='danger'
						variant='fill'
						size='small'
						icon={<LogoutIcon />}
					/>

				</div>

			</header>

			<ul
				className={styles['page-list']}
			>
				{dashboardRoutes.map(route =>
					<li
						key={route.path ?? route.label}
						className={isMinimized ? styles['minimized'] : undefined}
					>
						<NavLink
							to={route.path}
						>
							{route.icon}
							<p>{route.label}</p>
						</NavLink>
					</li>

				)}
			</ul>

		</aside>
	);

};

export default Sidebar;