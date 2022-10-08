import { createContext, useContext } from 'react';

import { defaultUser, UserSansPassword } from 'schemas/user';

import { UserProviderProps } from './user.context.types';

const UserContext = createContext<UserSansPassword>(defaultUser);

const useUser = (): UserSansPassword => {
	const user = useContext(UserContext);
	if (user === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return user;
};

const UserProvider = ({
	children,
	user,
}: UserProviderProps) => (
	<UserContext.Provider
		value={user}
	>
		{children}
	</UserContext.Provider>
);

export {
	UserProvider,
	useUser,
};
