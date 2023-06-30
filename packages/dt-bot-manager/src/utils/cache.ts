import Cookies from 'js-cookie';
import settingConfig from '@/configs/setting';

const { tokenKey, themeKey, loginStateKey } = settingConfig;

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

export function getLoginState(): string {
	return window.localStorage.getItem(loginStateKey);
}
export function setLoginState(data: string) {
	window.localStorage.setItem(loginStateKey, data);
}
export function clearLoginState() {
	window.localStorage.removeItem(loginStateKey);
}
