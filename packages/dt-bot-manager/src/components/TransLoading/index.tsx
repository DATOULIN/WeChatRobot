import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';
const TransLoading: React.FC = () => {
	return (
		<Spin tip="Loading..." size="large">
			<div className={styles['spin-content']} />
		</Spin>
	);
};
export default TransLoading;
