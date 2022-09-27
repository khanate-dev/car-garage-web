import {
	createBrowserRouter,
	LoaderFunction,
	redirect,
	RouterProvider,
} from 'react-router-dom';

import { getSetting } from 'helpers/settings';

import { Error } from 'routes/error';
import { Dashboard } from 'routes/dashboard';
import { Login } from 'routes/login';
import { Register } from 'routes/register';

import Providers from 'components/Providers';

import 'theme';

const redirectIfNotUserLoader: LoaderFunction = async () => {
	const user = getSetting('user');
	if (!user) return redirect('/login');
	return;
};

const redirectIfUserLoader: LoaderFunction = async () => {
	const user = getSetting('user');
	if (user) return redirect('/');
	return;
};

const router = createBrowserRouter([
	{
		index: true,
		element: <Dashboard />,
		loader: redirectIfNotUserLoader,
		errorElement: <Error />,
	},
	{
		path: '/login',
		element: <Login />,
		loader: redirectIfUserLoader,
		errorElement: <Error />,
	},
	{
		path: '/register',
		element: <Register />,
		loader: redirectIfUserLoader,
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
