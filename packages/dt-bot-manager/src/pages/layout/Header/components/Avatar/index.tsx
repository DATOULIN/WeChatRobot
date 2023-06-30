import React from 'react';
import { Avatar, Divider, Dropdown, MenuProps, theme } from 'antd';
import { ToolOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getPrefixCls } from '@/utils';
import useTheme from '@/store/theme';

const { useToken } = theme;

enum MenuItemKey {
	basicInfo = '0',
	security = '1',
	logout = '2'
}

const DTAvatar: React.FC = () => {
	const prefixCls = getPrefixCls('global-avatar-container');
	const [_, setThemeColor] = useTheme();
	const { token } = useToken();

	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary
	};

	const items: MenuProps['items'] = [
		{
			key: MenuItemKey.basicInfo,
			label: '基础信息',
			icon: <ToolOutlined />
		},
		{
			key: MenuItemKey.security,
			label: '安全中心',
			icon: <ToolOutlined />
		},
		{
			key: 'divider',
			type: 'divider'
		},
		{
			key: MenuItemKey.logout,
			label: '退出登录',
			icon: <ToolOutlined />
		}
	];

	const menuClickEventMap: Record<MenuItemKey, () => void> = {
		[MenuItemKey.basicInfo]: () => {},
		[MenuItemKey.security]: () => {},
		[MenuItemKey.logout]: () => {
			console.log('logout');
		}
	};

	const handleMenuClick: MenuProps['onClick'] = (e) => {
		menuClickEventMap[e.key]();
	};
	return (
		<div className={styles[`${prefixCls}`]}>
			<Dropdown
				menu={{
					items,
					onClick: handleMenuClick
				}}
				dropdownRender={(menu) => (
					<div className={styles[`${prefixCls}-dropdown`]} style={contentStyle}>
						<div className={styles[`${prefixCls}-info`]}>
							<div>xxx</div>
						</div>
						<Divider style={{ margin: 0 }} />
						{React.cloneElement(menu as React.ReactElement, {
							className: styles['menu-container']
						})}
					</div>
				)}
				getPopupContainer={() =>
					document.getElementsByClassName(styles[`${prefixCls}`])[0] as HTMLElement
				}
			>
				<Avatar size="large" icon={<UserOutlined />} />
			</Dropdown>
		</div>
	);
};

export default DTAvatar;
