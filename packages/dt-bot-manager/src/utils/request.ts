import axios from 'axios';
import { message, Modal } from 'antd';
import { getToken } from '@/utils/auth';
// create an axios instance
const service = axios.create({
	// baseURL: "/api/", // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	baseURL: '', // url = base url + request url
	timeout: 5000,
	withCredentials: true
	// request timeout
});

// request interceptor
service.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = getToken();
		return config;
	},
	(error) => {
		// do something with request error
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	(response) => {
		const res = response.data;

		// if the custom code is not 0, it is judged as an error.
		if (res.code !== 0) {
			message.error(res.msg || 'Error');

			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
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
		console.log('err' + error); // for debug
		message.error(error.message);
		return Promise.reject(error);
	}
);

export default service;
