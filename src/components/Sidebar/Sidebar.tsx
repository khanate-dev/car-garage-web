import { useReducer } from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';

import { UserSansPassword } from 'schemas/user';

import { cx } from 'helpers/class-name';

import ThemeSwitch from 'components/ThemeSwitch';
import Logo from 'components/Logo/Logo';
import Avatar from 'components/Avatar';
import IconButton from 'components/IconButton';

import { ReactComponent as BackIcon } from 'icons/back.svg';
import { ReactComponent as LogoutIcon } from 'icons/logout.svg';

import styles from './Sidebar.module.scss';
import { SidebarProps } from './Sidebar.types';

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
				<li
					className={isMinimized ? styles['minimized'] : undefined}
				>
					<NavLink
						to='/'
					>
						<BackIcon />
						<p>Overview</p>
					</NavLink>
				</li>

				<li
					className={isMinimized ? styles['minimized'] : undefined}
				>
					<NavLink
						to='/products'
					>
						<BackIcon />
						<p>Products</p>
					</NavLink>
				</li>
			</ul>

		</aside>
	);

};

export default Sidebar;