import React from 'react';
import { Breadcrumb } from 'antd';
import useMenu from '@/store/menu';

type BreadcrumbItem = Array<{
	title: React.ReactNode;
	key: string;
}>;
interface PropsType {
	breadcrumbItems: BreadcrumbItem[];
}
const DTBreadcrumb: React.FC<PropsType> = (props) => {
	const { breadcrumbItems } = props;
	const [menuLists] = useMenu();

	return (
		<Breadcrumb>
			<Breadcrumb.Item>User</Breadcrumb.Item>
			<Breadcrumb.Item>Bill</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default DTBreadcrumb;
