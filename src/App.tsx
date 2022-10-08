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
	MakeTypesUpdate,
	makeTypesUpdateAction,
	makeTypesUpdateLoader,
} from 'routes/dashboard/make-types';
import {
	ModelsAdd,
	modelsAddAction,
	modelsAddLoader,
	ModelsUpdate,
	modelsUpdateAction,
	modelsUpdateLoader,
	ModelsView,
	modelsViewLoader,
} from 'routes/dashboard/model';
import {
	BodyTypesView,
	bodyTypesViewLoader,
	BodyTypesAdd,
	bodyTypesAddLoader,
	bodyTypesAddAction,
	BodyTypesUpdate,
	bodyTypesUpdateLoader,
	bodyTypesUpdateAction,
	favoriteAddAction,
	favoriteDeleteAction,
	ReviewsAdd,
	reviewsAddLoader,
	reviewsAddAction,
	ReviewsUpdate,
	reviewsUpdateLoader,
	reviewsUpdateAction,
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
		index: true,
		path: '',
		element: <Overview />,
		loader: overviewLoader,
		label: 'Overview',
		icon: icons.overview,
	},
	{
		path: 'products',
		label: 'Products',
		icon: icons.products,
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
	},
	{
		path: '/make-types',
		label: 'Make Types',
		icon: icons.makeTypes,
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
			{
				path: 'update/:makeTypeId',
				element: <MakeTypesUpdate />,
				loader: makeTypesUpdateLoader,
				action: makeTypesUpdateAction,
			},
		],
	},
	{
		path: '/models',
		label: 'Models',
		icon: icons.models,
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
			{
				path: 'update/:modelId',
				element: <ModelsUpdate />,
				loader: modelsUpdateLoader,
				action: modelsUpdateAction,
			},
		],
	},
	{
		path: '/body-types',
		label: 'Body Types',
		icon: icons.bodyTypes,
		children: [
			{
				index: true,
				element: <BodyTypesView />,
				loader: bodyTypesViewLoader,
			},
			{
				path: 'review/:bodyTypeId',
				children: [
					{
						path: 'add',
						element: <ReviewsAdd />,
						loader: reviewsAddLoader,
						action: reviewsAddAction,
					},
					{
						path: 'update/:reviewId',
						element: <ReviewsUpdate />,
						loader: reviewsUpdateLoader,
						action: reviewsUpdateAction,
					},
				],
			},
			{
				path: 'favorite/:bodyTypeId',
				children: [
					{
						path: 'add',
						action: favoriteAddAction,
					},
					{
						path: 'delete/:favoriteId',
						action: favoriteDeleteAction,
					},
				],
			},
			{
				path: 'add',
				element: <BodyTypesAdd />,
				loader: bodyTypesAddLoader,
				action: bodyTypesAddAction,
			},
			{
				path: 'update/:bodyTypeId',
				element: <BodyTypesUpdate />,
				loader: bodyTypesUpdateLoader,
				action: bodyTypesUpdateAction,
			},
		],
	},
];

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		loader: redirectIfNotUserLoader,
		errorElement: <ErrorBoundary />,
		children: [{
			errorElement: <ErrorBoundary />,
			children: dashboardRoutes,
		}],
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
