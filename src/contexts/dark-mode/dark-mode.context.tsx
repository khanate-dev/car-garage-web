import { createContext, useContext, useEffect, useState } from 'react';

import { getSetting, setSetting } from 'helpers/settings';

import {
	DarkModeContext as DarkModeContextType,
	DarkModeProviderProps,
} from './dark-mode.context.types';

const DarkModeContext = createContext<DarkModeContextType>({
	isDarkMode: false,
	toggleDarkMode: () => false,
});

const useIsDarkMode = () => {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error(
			'useDarkMode must be used within an AppStateProvider'
		);
	}
	return context.isDarkMode;
};

const useToggleDarkMode = () => {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error(
			'useToggleDarkMode must be used within a DarkModeProvider'
		);
	}
	return () => {
		context.toggleDarkMode();
	};
};

const query = window.matchMedia?.('prefers-color-scheme: dark') ?? { matches: false };
const darkModePreference = getSetting('isDarkMode');
if (darkModePreference) document.body.classList.add('dark');

const DarkModeProvider = ({
	children,
}: DarkModeProviderProps) => {

	const [isDarkMode, setIsDarkMode] = useState<boolean>(
		darkModePreference
		?? query.matches
	);

	const toggleDarkMode = (override?: boolean) => {

		const newIsDarkMode = override ?? !isDarkMode;

		setIsDarkMode(newIsDarkMode);
		setSetting('isDarkMode', newIsDarkMode);

		if (newIsDarkMode) {
			document.body.classList.add('dark');
		}
		else {
			document.body.classList.remove('dark');
		}

	};

	useEffect(() => {
		const callback = (event: MediaQueryListEvent) => {
			toggleDarkMode(event.matches);
		};
		query.addEventListener('change', callback);
		return () => {
			query.removeEventListener('change', callback);
		};
	}, []);

	return (
		<DarkModeContext.Provider
			value={{
				isDarkMode,
				toggleDarkMode,
			}}
		>
			{children}
		</DarkModeContext.Provider>
	);
};

export {
	DarkModeProvider,
	useIsDarkMode,
	useToggleDarkMode,
};