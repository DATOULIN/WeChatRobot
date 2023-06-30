import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { homePath } from '@/configs/global-router-path';

const Page404: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Result
			status="404"
			title="404"
			subTitle="对不起，您访问的页面不存在！"
			extra={
				<Button type="primary" onClick={() => navigate(homePath, { replace: true })}>
					Back Home
				</Button>
			}
		/>
	);
};
export default Page404;
