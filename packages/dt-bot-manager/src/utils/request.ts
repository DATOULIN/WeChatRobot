import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { clearToken, getToken } from '@/utils/cache';
import settingConfig from '@/configs/setting';
import { ResponseCodeEnum, ResponseListResult, ResponseResult } from '@/types/response';

const { httpTimeout, apiBaseURL } = settingConfig;
const service = axios.create({
	// withCredentials: true, // send cookies when cross-domain requests
	baseURL: '/api/', // url = base url + request url
	timeout: httpTimeout,
	withCredentials: true
});

service.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = getToken();
		return config;
	},
	(error) => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

service.interceptors.response.use(
	(response) => {
		const res = response.data;
		if (res.code !== 0) {
			message.error(res.msg || 'Error').then(() => {});
			return Promise.reject(new Error(res.message || 'Error'));
		} else {
			return res;
		}
	},
	(error) => {
		const res = error.response.data;
		console.log('err', error); // for debug
		if (
			res.code === ResponseCodeEnum.UnauthorizedNoTokenError ||
			res.code === ResponseCodeEnum.UnauthorizedTokenTimeout ||
			res.code === ResponseCodeEnum.UnauthorizedTokenError
		) {
			clearToken();
			location.reload();
			// Modal.confirm({
			// 	type: 'warning',
			// 	title: '警告',
			// 	content: '登录状态已经过期，是否重新登录？',
			// 	okText: 'Re-Login',
			// 	cancelText: 'Cancel',
			// 	onOk: () => {
			// 		location.reload();
			// 	}
			// });
		} else {
			message.error(res.msg || error.message).then(() => {});
		}
		return Promise.reject(error);
	}
);

/**封装给业务端使用的*/
export const requestWrapper = <T = never>(
	url: string,
	options?: AxiosRequestConfig
): Promise<ResponseResult<T>> => {
	return service(url, {
		...options
	});
};
export const requestListWrapper = <T = never>(
	url: string,
	options?: AxiosRequestConfig
): Promise<ResponseListResult<T>> => {
	return service(url, {
		...options
	});
};
export default service;
