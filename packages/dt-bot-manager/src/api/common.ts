import request, { requestWrapper } from '@/utils/request';

export function getVerificationCode() {
	return requestWrapper<{ id: string; b64s: string }>('/common/getCaptCha', {
		method: 'GET'
	});
}
