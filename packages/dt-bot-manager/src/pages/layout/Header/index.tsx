import React from 'react';
import { Layout } from 'antd';
import styles from './index.less';
import { getPrefixCls } from '@/utils';
import DTAvatar from './components/Avatar';
import DTLogo from './components/Logo';

const { Header } = Layout;
const DTHeader: React.FC = () => {
	const prefixCls = getPrefixCls('global-header');

	return (
		<Header className={styles[`${prefixCls}-container-wrapper`]}>
			<DTLogo />
			<DTAvatar />
		</Header>
	);
};
export default DTHeader;
