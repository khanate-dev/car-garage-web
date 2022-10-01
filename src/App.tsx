import {
	createBrowserRouter,
	LoaderFunction,
	redirect,
	RouterProvider,
} from 'react-router-dom';

import { getSetting } from 'helpers/settings';

import { ErrorBoundary } from 'routes/error';
import { Login } from 'routes/login';
import { Register } from 'routes/register';
import { Dashboard } from 'routes/dashboard';
import { Overview, overviewLoader } from 'routes/dashboard/overview';
import { Products, productsLoader } from 'routes/dashboard/products';

import Providers from 'components/Providers';

import 'theme';

const redirectIfNotUserLoader: LoaderFunction = async () => {
	const user = getSetting('user');
	if (!user) return redirect('/login');
	return user;
};

const redirectIfUserLoader: LoaderFunction = async () => {
	const user = getSetting('user');
	if (user) return redirect('/');
	return;
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		loader: redirectIfNotUserLoader,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <Overview />,
				loader: overviewLoader,
				errorElement: <ErrorBoundary />,
			},
			{
				path: '/products',
				element: <Products />,
				loader: productsLoader,
				errorElement: <ErrorBoundary />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
		loader: redirectIfUserLoader,
		errorElement: <ErrorBoundary />,
	},
	{
		path: '/register',
		element: <Register />,
		loader: redirectIfUserLoader,
		errorElement: <ErrorBoundary />,
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
