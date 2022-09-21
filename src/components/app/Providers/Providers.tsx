import { DarkModeProvider } from 'contexts/dark-mode';

import { ProvidersProps } from './Providers.types';

const Providers = ({
	children,
	isDarkMode,
	setIsDarkMode,
}: ProvidersProps) => (
	<DarkModeProvider {...{
		isDarkMode,
		setIsDarkMode,
	}}>
		{children}
	</DarkModeProvider>
);

export default Providers;