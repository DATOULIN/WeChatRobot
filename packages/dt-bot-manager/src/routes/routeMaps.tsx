import { Navigate, RouteObject } from 'react-router-dom';
import { Login, Register, Dashboard, Page404, Layout, About } from './routeComponents';
export const routeMaps: Array<RouteObject> = [
	{
		path: '/',
		element: <Navigate to="/dashboard" />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'dashboard',
				element: <Dashboard />
			},
			{
				path: 'about',
				element: <About />
			}
		]
	},
	{
		path: '*',
		element: <Page404 />
	}
];
