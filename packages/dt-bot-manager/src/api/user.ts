import request, { requestListWrapper, requestWrapper } from '@/utils/request';
import {
	LoginParams,
	LoginResponseData,
	RegisterParams,
	UserDataType,
	UserListParams
} from '@/types/user';

const userPrefix: string = '/v1/user';

export function login(data: LoginParams) {
	return requestWrapper<LoginResponseData>(`${userPrefix}/login`, {
		method: 'post',
		data
	});
}

export function register(data: RegisterParams) {
	return request({
		url: `${userPrefix}/register`,
		method: 'post',
		data
	});
}

export function logout() {
	return requestWrapper<LoginResponseData>(`${userPrefix}/logout`, {
		method: 'post',
		data: {}
	});
}

export function queryUserList(params: UserListParams) {
	return requestListWrapper<UserDataType[]>(`${userPrefix}/list`, {
		method: 'get',
		params
	});
}
