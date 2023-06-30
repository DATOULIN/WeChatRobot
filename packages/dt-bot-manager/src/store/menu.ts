import { atom, useAtom } from 'jotai';
import { MenuItem } from '@/types/menu';
import { useEffect } from 'react';
import { extractMenuItems, updatePath } from '@/utils/menu';
import { routeMaps } from '@/routes/routeMaps';

export const menuListAtom = atom<MenuItem[]>([]);
const useMenu = (): [MenuItem[], any] => {
	const [menuLists, setMenuLists] = useAtom(menuListAtom);

	// 通过路由表生成菜单
	useEffect(() => {
		const updateRoutes = updatePath(routeMaps);
		const menuItems = extractMenuItems(updateRoutes)[0].children;
		setMenuLists(menuItems);
	}, [routeMaps]);

	return [menuLists, setMenuLists];
};

export default useMenu;
