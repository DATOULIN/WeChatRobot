import { Navigate, RouteObject } from 'react-router-dom';
import {
	About,
	Dashboard,
	Layout,
	Login,
	Page404,
	Register,
	ThemeSetting,
	User
} from './routeComponents';
import {
	BankOutlined,
	NodeIndexOutlined,
	SkinOutlined,
	ToolOutlined,
	UserOutlined
} from '@ant-design/icons';
import React from 'react';

export const routeMaps: Array<RouteObject> = [
	{
		path: '/',
		element: <Navigate to="/work_bench/dashboard" />,
		handle: {
			hide: true
		}
	},
	{
		path: '/work_bench',
		element: <Navigate to="/work_bench/dashboard" />,
		handle: {
			hide: true
		}
	},
	{
		path: 'login',
		element: <Login />,
		handle: {
			title: '登录',
			hide: true
		}
	},
	{
		path: 'register',
		element: <Register />,
		handle: {
			title: '注册',
			hide: true
		}
	},
	{
		path: '/work_bench',
		element: <Layout />,
		handle: {
			hide: false
		},
		children: [
			{
				index: true,
				path: 'dashboard',
				element: <Dashboard />,
				handle: {
					title: '首页',
					auth: true,
					hide: false,
					icon: <BankOutlined />
				}
			},
			{
				path: 'user',
				element: <User />,
				handle: {
					title: '用户管理',
					auth: true,
					hide: false,
					icon: <UserOutlined />
				}
			},
			{
				path: 'setting',
				handle: {
					title: '系统设置',
					auth: true,
					hide: false,
					icon: <ToolOutlined />
				},
				children: [
					{
						path: 'theme',
						element: <ThemeSetting />,
						handle: {
							title: '主题设置',
							auth: true,
							hide: false,
							icon: <SkinOutlined />
						}
					},
					{
						path: 'themes',
						handle: {
							title: '主题设置',
							auth: true,
							hide: false,
							icon: <SkinOutlined />
						}
					}
				]
			},
			{
				path: 'about',
				element: <About />,
				handle: {
					title: '关于',
					auth: false,
					hide: false,
					icon: <NodeIndexOutlined />
				}
			}
		]
	},
	{
		path: '*',
		element: <Page404 />,
		handle: {
			hide: true
		}
	}
];
