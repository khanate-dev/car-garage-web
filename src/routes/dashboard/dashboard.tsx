import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { deleteRequest } from 'helpers/api';
import { removeSetting } from 'helpers/settings';

import Sidebar from 'components/Sidebar';

export const Dashboard = () => {

	const navigate = useNavigate();

	const logout = async (isLoggedOut?: boolean) => {
		if (!isLoggedOut) await deleteRequest('session');
		removeSetting('user');
		removeSetting('accessToken');
		removeSetting('refreshToken');
		navigate('/login');
	};

	useEffect(() => {
		const invalidateUser = () => logout(true);
		window.addEventListener('invalidate-user', invalidateUser);
		return () => {
			window.removeEventListener('invalidate-user', invalidateUser);
		};
	}, []);

	return (
		<>
			<Sidebar
				onLogout={logout}
			/>
			<Outlet />
		</>
	);

};