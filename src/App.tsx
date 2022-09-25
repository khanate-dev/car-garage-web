import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';

import { Dashboard, dashboardLoader } from 'routes/dashboard';
import { Login, loginLoader } from 'routes/login';
import { Error } from 'routes/error';

import Providers from 'components/Providers';

import 'theme';

const router = createBrowserRouter([
	{
		index: true,
		element: <Dashboard />,
		loader: dashboardLoader,
		errorElement: <Error />,
	},
	{
		path: '/login',
		element: <Login />,
		loader: loginLoader,
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
