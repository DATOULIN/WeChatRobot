import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';

import { Outlet } from 'react-router-dom';
const { Content } = Layout;

const DTContent: React.FC = () => {
	const {
		token: { colorBgContainer }
	} = theme.useToken();
	return (
		<Content style={{ margin: '0 16px' }}>
			<Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item>User</Breadcrumb.Item>
				<Breadcrumb.Item>Bill</Breadcrumb.Item>
			</Breadcrumb>
			<div style={{ padding: 24, height: 'calc(100vh - 180px)', background: colorBgContainer }}>
				<Outlet />
			</div>
		</Content>
	);
};

export default DTContent;
