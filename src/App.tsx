import Providers from 'components/app/Providers';

import Dashboard from 'pages/Dashboard';

import 'theme/theme.scss';

function App() {

	return (
		<Providers>
			<Dashboard />
		</Providers>
	);
}

export default App;
