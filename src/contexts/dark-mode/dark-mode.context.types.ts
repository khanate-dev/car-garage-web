import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface DarkModeContext {
	isDarkMode: boolean,
	setIsDarkMode: Dispatch<SetStateAction<boolean>>,
}

export interface DarkModeProviderProps extends DarkModeContext {
	children: ReactNode,
}