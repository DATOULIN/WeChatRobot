import React from 'react';
import useTheme from '@/store/theme';
import { Space } from 'antd';

interface PropsType {}
const DTLogo: React.FC<PropsType> = () => {
	const [themeColor] = useTheme();

	return (
		<Space>
			<img src="" alt="" />
			<h1 style={{ color: themeColor }}>管理系统</h1>;
		</Space>
	);
};

export default DTLogo;
