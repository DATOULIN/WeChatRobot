interface SettingConfig {
	// document title
	title: string;
	// http timeout
	httpTimeout: number;
	// base api url
	apiBaseURL: string;
	// token cookie key
	tokenKey: string;
	themeKey: string;
	loginStateKey: string;
	iconPath: string;
}
const settingConfig: SettingConfig = {
	title: 'robot-manager',
	httpTimeout: 5000,
	apiBaseURL: '/api/',
	tokenKey: 'ACCESS_TOKEN',
	themeKey: 'DT_THEME',
	loginStateKey: 'DT_LOGIN_STATE',
	iconPath: '//at.alicdn.com/t/c/font_4148241_n15p4rrza4.js'
};
export default settingConfig;
