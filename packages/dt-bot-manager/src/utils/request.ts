import axios from 'axios';
import { message, Modal } from 'antd';
import { getToken } from '@/utils/cookie';
import settingConfig from '@/configs/setting';
const { httpTimeout, apiBaseURL } = settingConfig;
const service = axios.create({
	// withCredentials: true, // send cookies when cross-domain requests
	baseURL: apiBaseURL, // url = base url + request url
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

			if (res.code === 50008) {
				// to re-login
				Modal.confirm({
					type: 'warning',
					content: 'You have been logged out, you can cancel to stay on this page, or log in again,Confirm logout',
					okText: 'Re-Login',
					cancelText: 'Cancel'
				});
			}
			return Promise.reject(new Error(res.message || 'Error'));
		} else {
			return res;
		}
	},
	(error) => {
		const res = error.response.data;
		console.log('err', error); // for debug
		message.error(res.msg || error.message).then(() => {});
		return Promise.reject(error);
	}
);

export default service;
