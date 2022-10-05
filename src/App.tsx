import {
	createBrowserRouter,
	LoaderFunction,
	redirect,
	RouterProvider,
} from 'react-router-dom';


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
	productsAddLoader,
	productsAddAction,
} from 'routes/dashboard/products';
import {
	MakeTypesView,
	makeTypesViewLoader,
	MakeTypesAdd,
	makeTypesAddAction,
} from 'routes/dashboard/make-types';
import {
	ModelsAdd,
	modelsAddAction,
	modelsAddLoader,
	ModelsView,
	modelsViewLoader,
} from 'routes/dashboard/model';
import {
	BodyTypesView,
	bodyTypesViewLoader,
	BodyTypesAdd,
	bodyTypesAddLoader,
	bodyTypesAddAction,
} from 'routes/dashboard/body-types';

import Providers from 'components/Providers';
import { icons } from 'components/icons';

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
		icon: icons.overview,
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
		icon: icons.products,
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
		icon: icons.makeTypes,
	},
	{
		path: '/models',
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <ModelsView />,
				loader: modelsViewLoader,
			},
			{
				path: 'add',
				element: <ModelsAdd />,
				loader: modelsAddLoader,
				action: modelsAddAction,
			},
		],
		label: 'Models',
		icon: icons.models,
	},
	{
		path: '/body-types',
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <BodyTypesView />,
				loader: bodyTypesViewLoader,
			},
			{
				path: 'add',
				element: <BodyTypesAdd />,
				loader: bodyTypesAddLoader,
				action: bodyTypesAddAction,
			},
		],
		label: 'Body Types',
		icon: icons.bodyTypes,
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
