import React, { Suspense } from 'react';
import { Layout } from 'antd';

import { Outlet } from 'react-router-dom';
import TransLoading from '@/components/TransLoading';
const { Content } = Layout;

const DTContent: React.FC = () => {
	return (
		<Content>
			<Suspense fallback={<TransLoading />}>
				<Outlet />
			</Suspense>
		</Content>
	);
};

export default DTContent;
