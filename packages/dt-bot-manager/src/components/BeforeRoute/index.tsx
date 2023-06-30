import { getToken } from '@/utils/cookie';
import React, { Fragment, useEffect, useMemo } from 'react';
import { Navigate, useLocation, matchRoutes, RouteObject } from 'react-router-dom';
import { routeMaps } from '@/routes/routeMaps';
import getPageTitle from '@/utils/getPageTitle';
import settingConfig from '@/configs/setting';
const BeforeRoute: React.FC<{ children: React.ReactNode }> = (props) => {
	const { children } = props;
	const isToken = getToken();
	const location = useLocation();
	const { pathname } = location;
	// 匹配当前层级路由树
	const mathchs = matchRoutes(routeMaps, location);

	// 判断页面是否需要登录后才能进入
	const isNeedLogin = mathchs?.some((item): boolean => {
		const route: RouteObject = item.route;
		// 没有配置字段的直接返回
		if (!route.handle) return false;
		// 返回是否需要登录
		return route.handle.auth;
	});

	const documentTitle = useMemo(() => {
		return mathchs.find((item) => item.pathname === pathname)?.route.handle?.title;
	}, [pathname, mathchs]);

	useEffect(() => {
		document.title = getPageTitle(documentTitle) || settingConfig.title;
	}, [pathname]);

	if (!isToken && isNeedLogin) {
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	}

	// 重定向到登录页
	return <Fragment>{children}</Fragment>;
};

export default BeforeRoute;
