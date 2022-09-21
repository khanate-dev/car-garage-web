import { ReactNode, Dispatch, SetStateAction } from 'react';

export interface ProvidersProps {
	children: ReactNode,
	isDarkMode: boolean,
	setIsDarkMode: Dispatch<SetStateAction<boolean>>,
}