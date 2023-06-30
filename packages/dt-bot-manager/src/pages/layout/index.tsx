import React from 'react';
import { Layout } from 'antd';
import DTHeader from '@/pages/layout/Header';
import DTSider from '@/pages/layout/Sider';
import DTContent from '@/pages/layout/Content';

const DTLayout: React.FC = () => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<DTHeader />
			<Layout>
				<DTSider />
				<DTContent />
			</Layout>
		</Layout>
	);
};

export default DTLayout;
