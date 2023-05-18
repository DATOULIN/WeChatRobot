import request from '@/utils/request';
export interface LoginParams {
	email: string;
	password: string;
}
export interface RegisterParams {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export function login(data: LoginParams) {
	return request({
		url: '/v1/user/login',
		method: 'post',
		data
	});
}

export function register(data: RegisterParams) {
	return request({
		url: '/v1/user/register',
		method: 'post',
		data
	});
}
