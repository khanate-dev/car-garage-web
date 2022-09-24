import { ReactNode } from 'react';

import { UserSansPassword } from 'schemas';

export interface UserProviderProps {
	user: UserSansPassword,
	children: ReactNode,
}