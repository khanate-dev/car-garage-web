import {
	createBrowserRouter,
	LoaderFunction,
	redirect,
	RouterProvider,
} from 'react-router-dom';
import {
	GraphIcon as OverviewIcon,
	MegaphoneIcon as ProductsIcon,
	PlugIcon as BodTypesIcon,
	RocketIcon as MakeTypesIcon,
	TrophyIcon as ModelsIcon,
} from '@primer/octicons-react';

import { getSetting } from 'helpers/settings';

import { ErrorBoundary } from 'routes/error';
import { Login, loginAction } from 'routes/login';
import { Register, registerAction } from 'routes/register';
import { Dashboard } from 'routes/dashboard';
import { Overview, overviewLoader } from 'routes/dashboard/overview';
import {
	ProductsView,
	productsViewLoader,
	ProductsAdd,
	productsAddAction,
	productsAddLoader,
} from 'routes/dashboard/products';
import {
	MakeTypesView,
	makeTypesViewLoader,
	MakeTypesAdd,
	makeTypesAddAction,
} from 'routes/dashboard/make-types';
import { Models, modelsAction, modelsLoader } from 'routes/dashboard/model';
import { BodyTypes, bodyTypesAction, bodyTypesLoader } from 'routes/dashboard/body-types';

import Providers from 'components/Providers';

import { DashboardRoute } from 'types/general';

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

export const dashboardRoutes: DashboardRoute[] = [
	{
		path: '',
		element: <Overview />,
		loader: overviewLoader,
		errorElement: <ErrorBoundary />,
		label: 'Overview',
		icon: <OverviewIcon />,
	},
	{
		path: 'products',
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <ProductsView />,
				loader: productsViewLoader,
			},
			{
				path: 'add',
				element: <ProductsAdd />,
				loader: productsAddLoader,
				action: productsAddAction,
			},
		],
		label: 'Products',
		icon: <ProductsIcon />,
	},
	{
		path: '/make-types',
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <MakeTypesView />,
				loader: makeTypesViewLoader,
			},
			{
				path: 'add',
				element: <MakeTypesAdd />,
				action: makeTypesAddAction,
			},
		],
		label: 'Make Types',
		icon: <MakeTypesIcon />,
	},
	{
		path: '/models',
		element: <Models />,
		loader: modelsLoader,
		action: modelsAction,
		errorElement: <ErrorBoundary />,
		label: 'Models',
		icon: <ModelsIcon />,
	},
	{
		path: '/body-types',
		element: <BodyTypes />,
		loader: bodyTypesLoader,
		action: bodyTypesAction,
		errorElement: <ErrorBoundary />,
		label: 'Body Types',
		icon: <BodTypesIcon />,
	},
];

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		loader: redirectIfNotUserLoader,
		errorElement: <ErrorBoundary />,
		children: dashboardRoutes,
	},
	{
		path: '/login',
		element: <Login />,
		loader: redirectIfUserLoader,
		action: loginAction,
		errorElement: <ErrorBoundary />,
	},
	{
		path: '/register',
		element: <Register />,
		loader: redirectIfUserLoader,
		action: registerAction,
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
