import React from 'react';
import classNames from 'classnames';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './index.scss';
import { getPrefixCls } from '@/utils';

interface PropsType {
	title?: React.ReactNode;
	extra?: React.ReactNode;
	onBack?: () => void;
	className?: string;
}
const PageHeader: React.FC<PropsType> = (props) => {
	const { className, title, onBack } = props;

	const prefixCls = getPrefixCls('page-header-container');
	return (
		<div className={classNames(`${prefixCls}`, className)}>
			<div className={styles[`${prefixCls}-left`]}>
				{onBack && window.history.length > 1 ? <ArrowLeftOutlined /> : null}
			</div>
			<span className={styles[`${prefixCls}-left-title`]}>{title}</span>
		</div>
	);
};
export default PageHeader;
