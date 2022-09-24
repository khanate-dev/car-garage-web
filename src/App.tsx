import Providers from 'components/app/Providers';

import Dashboard from 'pages/Dashboard';
import Error from 'pages/Error';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	json,
} from 'react-router-dom';

import 'theme/theme.scss';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		errorElement: <Error />,
	},
]);

function App() {

	return (
		<Providers>
			<RouterProvider
				router={router}
			/>
		</Providers>
	);
}

export default App;
