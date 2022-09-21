import { ReactNode } from 'react';

import { User } from 'types/general';

export interface UserProviderProps {
	user: User,
	children: ReactNode,
}