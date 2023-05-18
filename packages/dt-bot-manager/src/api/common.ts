import request from '@/utils/request';

export function getVerificationCode() {
	return request({
		url: '/common/getCaptCha',
		method: 'GET'
	});
}
