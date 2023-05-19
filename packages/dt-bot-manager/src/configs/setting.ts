interface SettingConfig {
	// document title
	title: string;
	// http timeout
	httpTimeout: number;
	// base api url
	apiBaseURL: string;
	// token cookie key
	tokenKey: string;
	whiteList: Array<string>;
}
const settingConfig: SettingConfig = {
	title: 'robot-manager',
	httpTimeout: 5000,
	apiBaseURL: 'api',
	tokenKey: 'ACCESS_TOKEN',
	whiteList: ['/login', '/register']
};
export default settingConfig;
