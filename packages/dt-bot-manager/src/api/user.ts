import request, { requestWrapper } from '@/utils/request';
import { LoginParams, RegisterParams, LoginResponseData } from '@/types/user';

export function login(data: LoginParams) {
	return requestWrapper<LoginResponseData>('/v1/user/login', {
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
