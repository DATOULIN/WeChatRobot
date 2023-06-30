import Cookies from 'js-cookie';
import settingConfig from '@/configs/setting';
const { tokenKey, themeKey } = settingConfig;

export function getToken(): string {
	return Cookies.get(tokenKey);
}

export function setToken(data: string) {
	Cookies.set(tokenKey, data);
}

export function clearToken() {
	Cookies.remove(tokenKey);
}

export function getTheme(): string {
	return window.localStorage.getItem(themeKey);
}

export function clearTheme() {
	window.localStorage.removeItem(themeKey);
}
