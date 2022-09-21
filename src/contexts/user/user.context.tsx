import { createContext, useContext } from 'react';

import { User } from 'types/general';

import { UserProviderProps } from './user.context.types';

const UserContext = createContext<User>({
	UserID: 1,
	UserName: 'john.doe',
	UserType: 'Administrator',
	token: 'thisIsNotARealToken',
});

const useUser = (): User => {
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