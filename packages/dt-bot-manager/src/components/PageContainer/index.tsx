import React, { useMemo } from 'react';
import styles from './index.less';
import { getPrefixCls } from '@/utils';
import useMenu from '@/store/menu';
import { useLocation } from 'react-router-dom';
import { findByPath } from '@/utils/menu';
import DTBreadcrumb from '@/components/Breadcrumb';

type BreadcrumbItem = Array<{
	title: React.ReactNode;
	key: string;
}>;

interface PropsType {
	children: React.ReactNode;
	breadcrumbItems?: BreadcrumbItem[];
}
const PageContainer: React.FC<PropsType> = (props) => {
	const { children, breadcrumbItems } = props;
	const [menuLists] = useMenu();
	const location = useLocation();
	const { pathname } = location;

	const prefixCls = getPrefixCls('page-container');

	const pageTitle = useMemo(() => {
		const findItem = findByPath(menuLists, pathname);
		return findItem.label;
	}, [menuLists, pathname]);

	return (
		<div className={styles[`${prefixCls}`]}>
			{breadcrumbItems ? (
				<DTBreadcrumb breadcrumbItems={breadcrumbItems} />
			) : (
				<div className={styles[`${prefixCls}-title`]}>{pageTitle}</div>
			)}
			<div>{children}</div>
		</div>
	);
};
export default PageContainer;
