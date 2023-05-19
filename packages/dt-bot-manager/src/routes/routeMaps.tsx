import { Navigate, RouteObject } from 'react-router-dom';
import { Login, Register, Dashboard, Page404, Layout, About } from './routeComponents';

export const routeMaps: Array<RouteObject> = [
	{
		path: '/',
		element: <Navigate to="/work_bench/dashboard" />
	},
	{
		path: 'login',
		element: <Login />,
		handle: {
			title: '登录'
		}
	},
	{
		path: 'register',
		element: <Register />,
		handle: {
			title: '注册'
		}
	},
	{
		path: '/work_bench',
		element: <Layout />,
		children: [
			{
				index: true,
				path: 'dashboard',
				element: <Dashboard />,
				handle: {
					title: '首页',
					auth: true
				}
			},
			{
				path: 'about',
				element: <About />,
				handle: {
					title: '关于',
					auth: true
				}
			}
		]
	},
	{
		path: '*',
		element: <Page404 />
	}
];
