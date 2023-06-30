import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { findFirstPath, findParentPath } from '@/utils/menu';
import useResizeObserver from '@/hooks/useResizeObserver';
import useMenu from '@/store/menu';

const { Sider } = Layout;

const DTSider: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [menuLists] = useMenu();
	const location = useLocation();
	const { pathname } = location;
	const navigate = useNavigate();

	const autoTriggerWidth: number = 1280;
	const autoTrigger: boolean = true;
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	useResizeObserver(
		autoTrigger,
		autoTriggerWidth,
		() => setCollapsed(false),
		() => setCollapsed(true)
	);

	// 根据路由地址的变化，自动展开嵌套的菜单
	useEffect(() => {
		const findPath = findParentPath(menuLists, pathname);
		setOpenKeys(findPath);
	}, [pathname, menuLists, collapsed]);

	const handleMenuItemClick = ({ key }) => {
		navigate(key);
	};

	const onOpenChange = (keys: string[]) => {
		setOpenKeys(keys);
		// 当前浏览器的路由所在的嵌套路由组中是否有其他子路由被选中，如果有，路由保持不变，如果没有，选中第一个子路由，并进行路由跳转，展开的时候才做这步操作
		const parentPath = findParentPath(menuLists, pathname);
		if (keys.length > 0 && parentPath?.[0] !== keys[0]) {
			const firstPath = findFirstPath(menuLists, keys[0]);
			navigate(firstPath);
		}
	};

	const onCollapse = (value: boolean) => {
		setCollapsed(value);
	};

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
			<Menu
				theme="dark"
				openKeys={openKeys}
				onOpenChange={onOpenChange}
				selectedKeys={[pathname]}
				mode="inline"
				items={menuLists}
				onClick={handleMenuItemClick}
			/>
		</Sider>
	);
};

export default DTSider;
