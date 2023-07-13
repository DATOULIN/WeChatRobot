import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Image } from 'antd';
import { UserDataType } from '@/types/user';
import { useRequest } from 'ahooks';
import { queryUserList } from '@/api/user';
import { DtTable, DtTableColumnType, DtTableProps } from 'dt-components';

const User: React.FC = () => {
	const [state, setState] = useState({
		pageSize: 1,
		total: 1,
		current: 1,
		dataSource: [] as UserDataType[]
	});
	const { current, pageSize, dataSource, total } = state;

	const columns: DtTableColumnType<UserDataType>[] = [
		{
			title: '用户ID',
			dataIndex: 'user_id'
		},
		{
			title: '邮箱',
			dataIndex: 'email'
		},
		{
			title: '用户名',
			dataIndex: 'username'
		},
		{
			title: '电话号码',
			dataIndex: 'phone'
		},
		{
			title: '头像',
			dataIndex: 'avatar',
			render: (text) => {
				return <Image src={text} />;
			}
		},
		{
			title: '性别',
			dataIndex: 'sex'
		},
		{
			title: '个人简介',
			dataIndex: 'self_introduction'
		},
		{
			title: '上次登录时间',
			dataIndex: 'last_login_on'
		},
		{
			title: '上次登录IP',
			dataIndex: 'last_login_ip'
		},
		{
			title: '用户类型',
			dataIndex: 'user_type'
		},
		{
			title: '用户状态',
			dataIndex: 'state'
		},
		{
			title: '创建时间',
			dataIndex: 'created_on'
		},
		{
			title: '创建人',
			dataIndex: 'created_by'
		},
		{
			title: '修改时间',
			dataIndex: 'modified_on'
		},
		{
			title: '修改人',
			dataIndex: 'modified_by'
		},
		{
			title: '注销时间',
			dataIndex: 'deleted_on'
		},
		{
			title: '注销人',
			dataIndex: 'deleted_by'
		}
	];

	const { loading: queryListLoading } = useRequest(queryUserList, {
		defaultParams: [{ page: current, page_size: pageSize }],
		onSuccess: (res) => {
			if (res.code === 0) {
				setState({
					total: res.result.pager.total_rows,
					current: res.result.pager.page,
					pageSize: res.result.pager.page_size,
					dataSource: res.result.list
				});
			}
		}
	});

	const tableConfig: any = {
		defaultNullValue: '-',
		columns,
		tableProps: {
			loading: queryListLoading,
			bordered: false
		}
	};

	const onChange: DtTableProps<UserDataType>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra
	) => {};

	return (
		<PageContainer>
			<DtTable
				dataList={{
					dataSource,
					pageSize,
					total,
					current
				}}
				tableConfig={tableConfig}
				onChange={onChange}
			/>
		</PageContainer>
	);
};
export default User;
