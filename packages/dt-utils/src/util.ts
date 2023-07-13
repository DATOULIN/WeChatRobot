const getPrefixCls = (suffixCls: string) => {
	return suffixCls ? `dt-${suffixCls}` : 'dt';
};

export default getPrefixCls;
