export const getPrefixCls = (suffixCls: string) => {
	return suffixCls ? `dt-${suffixCls}` : 'dt';
};
