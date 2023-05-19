import React, { useState } from 'react';
import { theme, Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
const { Header } = Layout;
const DTHeader: React.FC = () => {
	const {
		token: { colorBgContainer }
	} = theme.useToken();
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Header style={{ padding: 0, background: colorBgContainer }}>
			{/*<Button*/}
			{/*	type="text"*/}
			{/*	icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
			{/*	onClick={() => setCollapsed(!collapsed)}*/}
			{/*	style={{*/}
			{/*		fontSize: '16px',*/}
			{/*		width: 64,*/}
			{/*		height: 64*/}
			{/*	}}*/}
			{/*/>*/}
		</Header>
	);
};
export default DTHeader;
