import { createContext, useContext } from 'react';

import { setSetting } from 'helpers/settings';

import {
	DarkModeContext as DarkModeContextType,
	DarkModeProviderProps,
} from './dark-mode.context.types';

const DarkModeContext = createContext<DarkModeContextType>({
	isDarkMode: false,
	setIsDarkMode: () => false,
});

const useDarkMode = () => {
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
		context.setIsDarkMode(prevIsDarkMode => {
			setSetting('isDarkMode', !prevIsDarkMode);
			return !prevIsDarkMode;
		});
	};
};

const useSetDarkMode = () => {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error(
			'useSetDarkMode must be used within an DarkModeProvider'
		);
	}
	return (isDarkMode: boolean) => {
		setSetting('isDarkMode', isDarkMode);
		context.setIsDarkMode(isDarkMode);
	};
};

const DarkModeProvider = ({
	children,
	isDarkMode,
	setIsDarkMode,
}: DarkModeProviderProps) => (
	<DarkModeContext.Provider
		value={{
			isDarkMode,
			setIsDarkMode,
		}}
	>
		{children}
	</DarkModeContext.Provider>
);

export {
	DarkModeProvider,
	useDarkMode,
	useToggleDarkMode,
	useSetDarkMode,
};