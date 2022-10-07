import { ReactNode } from 'react';

import { UserSansPassword } from 'schemas/user';

export interface UserProviderProps {
	user: UserSansPassword,
	children: ReactNode,
}
