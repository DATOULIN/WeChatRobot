import { RouteObject } from 'react-router-dom';
import { MenuItem } from '@/types/menu';
import _ from 'loadsh';

const joinPaths = (parentPath, childPath) => {
	if (!parentPath) {
		return childPath;
	}
	return `${parentPath}/${childPath}`;
};

const updatePath = (routes: RouteObject[], parentPath = '') => {
	return routes.map((route) => {
		const { path, children = [], ...rest } = route;
		const fullPath = joinPaths(parentPath, path);

		if (children.length > 0) {
			const childRoutes = updatePath(children, fullPath);
			return { path: fullPath, children: childRoutes, ...rest };
		}

		return { path: fullPath, ...rest };
	});
};

function extractMenuItems(routerLists: RouteObject[]): MenuItem[] {
	const result: MenuItem[] = [];
	routerLists.forEach((menu) => {
		if (!menu.handle?.hide) {
			const {
				handle: { title, icon },
				path
			} = menu;
			const newMenu: MenuItem = { label: title, icon, key: path, children: undefined };
			if (menu.children) {
				newMenu.children = extractMenuItems(menu.children);
			}
			result.push(newMenu);
		}
	});
	return result;
}

// 根据pathname找到子路由的父节点
const findParentPath = (menus: MenuItem[], pathname: string): string[] => {
	return menus
		.map((menu) => {
			const findIndex = menu.children?.findIndex((m) => m.key === pathname);
			if (findIndex >= 0) {
				return menu.key;
			}
		})
		.filter((item) => item);
};

// 根据pathname找到嵌套路由的子路由的第一项
const findFirstPath = (menus: MenuItem[], pathname: string): string => {
	return menus.find((menu) => menu.key === pathname)?.children[0].key;
};

// 根据pathname找到对应的菜单项
const findByPath = (menus: MenuItem[], pathname: string) => {
	const findItem = menus.map((menu) => {
		const { key } = menu;
		if (key === pathname) {
			return {
				...menu
			};
		} else if (menu?.children) {
			return findByPath(menu?.children, pathname);
		}
		return false;
	});
	return _.flattenDeep(findItem).find((item) => item);
};

export { extractMenuItems, updatePath, findParentPath, findFirstPath, findByPath };
