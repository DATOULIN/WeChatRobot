import React, { forwardRef, useMemo } from 'react';
import { Table, TableProps, Tooltip } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { TooltipPlacement } from 'antd/es/tooltip';
import classNames from 'classnames';
import { getPrefixCls } from '@/utils';
import './index.less';

/**
 * 数据源 包含
 * current
 * pageSize
 * total
 * dataSource
 * */
interface DataList<T = any> {
	dataSource?: TableProps<T>['dataSource'];
	current?: number;
	pageSize?: number;
	total?: number;
}

/**
 * 表格列表的数据
 * */
export interface FilterTableColumnType<T = any> extends ColumnType<T> {
	handleText?: (beforeText: any, record: T) => React.ReactNode;
	placement?: TooltipPlacement;
	isNowrap?: boolean;
	autoWidth?: boolean;
}

/**
 * 列配置项 包含
 * columns(表格columns数组)
 * tableProps(table表格选项)
 * paginationConfig(分页选项)
 * defaultNullValue(String-数值为空默认填值)
 * */
interface TableConfig<T = any> {
	defaultNullValue?: string;
	columns: ColumnType<T>[];
	paginationConfig: TableProps<T>['pagination'];
	tableProps: TableConfig<T>;
}

export interface FilterTableProps<T = any> {
	className?: string;
	dataList: DataList<T>;
	tableConfig: TableConfig;
	onChange?: TableProps<T>['onChange'];
}

const FilterTable = forwardRef<HTMLDivElement, FilterTableProps>((props, ref) => {
	const { className, dataList, tableConfig, onChange } = props;
	const { dataSource = [], current = 1, pageSize = 10, total = 0 } = dataList;
	const {
		defaultNullValue = '-',
		columns = [],
		tableProps = {},
		paginationConfig = { size: 'small' }
	} = tableConfig || {};

	const prefixCls = getPrefixCls('table');
	const cls = classNames(`${prefixCls}`, className);
	const nowrapCls = classNames(`${prefixCls}-nowrap`);

	const pagination = (config = {}) => {
		if (config === false) return false;
		if (!(config instanceof Object)) return false;
		return {
			current,
			pageSize,
			total,
			showSizeChanger: true,
			defaultCurrent: 1,
			pageSizeOptions: ['10', '15', '20', '50', '100'],
			showTotal: () => `共 ${total} 条数据`,
			...config
		};
	};

	const checkNullValue = (defaultValue: any) => {
		if (defaultValue === null || defaultValue === undefined || defaultValue === '') {
			return defaultNullValue;
		}
		return defaultValue;
	};

	const nowrapRender = (text: any, width: number | string, autoWidth: boolean) => {
		const newStyles: any = width && autoWidth ? { width } : null;
		return (
			<div className={nowrapCls} style={newStyles}>
				{text}
			</div>
		);
	};

	const newColumns = useMemo(() => {
		return columns.map((columnItem: FilterTableColumnType) => {
			const {
				placement = 'topLeft',
				autoWidth = false,
				isNowrap = true,
				handleText = () => {},
				width
			} = columnItem;
			// 处理默认浮层
			const columnsRender = (beforeText: any, record: any) => {
				let text;
				text = handleText(beforeText, record) || beforeText;
				text = checkNullValue(text);
				return (
					<Tooltip placement={placement} title={text}>
						{isNowrap ? nowrapRender(text, width, autoWidth) : text}
					</Tooltip>
				);
			};
			return {
				render: columnsRender,
				...columnItem
			};
		});
	}, []);

	return (
		<Table
			ref={ref}
			className={cls}
			onChange={onChange}
			scroll={{ x: true }}
			dataSource={dataSource}
			columns={newColumns}
			pagination={pagination(paginationConfig)}
			locale={{
				filterTitle: '筛选',
				filterConfirm: '确认',
				filterReset: '重置'
			}}
			{...tableProps}
		/>
	);
});

export default FilterTable;
