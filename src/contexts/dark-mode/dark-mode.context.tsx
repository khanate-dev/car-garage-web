import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from 'react';

import { getSetting, setSetting } from 'helpers/settings';

import {
	DarkModeContext as DarkModeContextType,
	DarkModeProviderProps,
} from './dark-mode.context.types';

const DarkModeContext = createContext<DarkModeContextType>({
	isDarkMode: false,
	toggleDarkMode: () => false,
	updateDarkMode: () => false,
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

const darkModePreference = getSetting('isDarkMode') ?? query.matches;
if (darkModePreference) document.body.classList.add('dark');

type Action = (
	| { type: 'toggle', }
	| { type: 'update', value: boolean, }
);

const toggleReducer = (
	prev: boolean,
	action: Action
): boolean => {

	const newIsDarkMode = (
		action.type === 'update'
			? action.value
			: !prev
	);

	setSetting('isDarkMode', newIsDarkMode);

	if (newIsDarkMode) {
		document.body.classList.add('dark');
	}
	else {
		document.body.classList.remove('dark');
	}

	return newIsDarkMode;

};

const DarkModeProvider = ({
	children,
}: DarkModeProviderProps) => {

	const [isDarkMode, dispatch] = useReducer(
		toggleReducer,
		darkModePreference ?? query.matches
	);

	const toggleDarkMode = useCallback(
		() => dispatch({ type: 'toggle' })
		, []
	);

	const updateDarkMode = useCallback(
		(value: boolean) => dispatch({ type: 'update', value })
		, []
	);

	useEffect(() => {
		const callback = (event: MediaQueryListEvent) => {
			updateDarkMode(event.matches);
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
				updateDarkMode,
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
