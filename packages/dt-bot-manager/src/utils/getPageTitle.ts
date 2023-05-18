import settingConfig from '@/configs/setting';

const { title } = settingConfig;
export default function getPageTitle(pageTitle: string): string {
	if (pageTitle) {
		return `${pageTitle} - ${title}`;
	}
	return `${title}`;
}
