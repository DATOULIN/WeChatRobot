import React from 'react';
import { ConfigProvider, theme } from 'antd';
import useTheme from '@/store/theme';

const AntdThemeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
	const [themeColor, setThemeColor] = useTheme();

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: themeColor,
					colorLink: themeColor
				},
				algorithm: theme.defaultAlgorithm
			}}
		>
			{props.children}
		</ConfigProvider>
	);
};

export default AntdThemeProvider;
