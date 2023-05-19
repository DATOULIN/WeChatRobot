import React, { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key,
		icon,
		children,
		label
	} as MenuItem;
}
const DTSider: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const items: MenuItem[] = [
		getItem('Option 1', '1', <PieChartOutlined />),
		getItem('Option 2', '2', <DesktopOutlined />),
		getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
		getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
		getItem('Files', '9', <FileOutlined />)
	];
	return (
		<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
			<div className="demo-logo-vertical" />
			<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
		</Sider>
	);
};

export default DTSider;
