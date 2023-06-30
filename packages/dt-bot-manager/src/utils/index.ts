import settingConfig from '@/configs/setting';

const { title } = settingConfig;
export const getPrefixCls = (suffixCls: string) => {
	return suffixCls ? `dt-${suffixCls}` : 'dt';
};

export default function getPageTitle(pageTitle: string): string {
	if (pageTitle) {
		return `${pageTitle} - ${title}`;
	}
	return `${title}`;
}
