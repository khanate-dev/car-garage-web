import { ReactNode } from 'react';

export interface DarkModeContext {
	isDarkMode: boolean,
	toggleDarkMode: () => void,
	updateDarkMode: (value: boolean) => void,
}

export interface DarkModeProviderProps {
	children: ReactNode,
}
