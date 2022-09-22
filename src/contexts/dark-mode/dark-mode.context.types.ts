import { ReactNode } from 'react';

export interface DarkModeContext {
	isDarkMode: boolean,
	toggleDarkMode: (value?: boolean) => void,
}

export interface DarkModeProviderProps {
	children: ReactNode,
}