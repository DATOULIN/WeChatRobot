import React from 'react';
import { Layout } from 'antd';
import DTHeader from '@/pages/layout/DTHeader';
import DTSider from '@/pages/layout/DTSider';
import DTContent from '@/pages/layout/DTContent';

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
