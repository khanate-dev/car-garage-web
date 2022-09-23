import {
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import { getSetting, setSetting } from 'helpers/settings';

import {
	DarkModeContext as DarkModeContextType,
	DarkModeProviderProps,
} from './dark-mode.context.types';

const DarkModeContext = createContext<DarkModeContextType>({
	isDarkMode: false,
	toggleDarkMode: () => false,
});

const useDarkMode = () => {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error(
			'useDarkMode must be used within a DarkModeProvider'
		);
	}
	return context;
};

const query = window.matchMedia('(prefers-color-scheme: dark)');

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
	useDarkMode,
};