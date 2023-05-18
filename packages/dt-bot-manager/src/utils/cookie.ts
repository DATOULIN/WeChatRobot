import Cookies from 'js-cookie';
import settingConfig from '@/configs/setting';
const { tokenKey } = settingConfig;

export function getToken(): string {
	return Cookies.get(tokenKey);
}

export function setToken(data: string) {
	Cookies.set(tokenKey, data);
}
