import { DarkModeProvider } from 'contexts/dark-mode';

import { ProvidersProps } from './Providers.types';

const Providers = ({
	children,
}: ProvidersProps) => (
	<DarkModeProvider>
		{children}
	</DarkModeProvider>
);

export default Providers;
