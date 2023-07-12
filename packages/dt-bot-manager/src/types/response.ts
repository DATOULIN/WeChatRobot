/**
 * 后端响应码*/
export enum ResponseCodeEnum {
	/** 鉴权失败，Token为空*/
	UnauthorizedNoTokenError = 10000003,
	/**鉴权失败，Token过期*/
	UnauthorizedTokenTimeout,
	/** 鉴权失败，Token不合法 */
	UnauthorizedTokenError
}

/**
 * 后端响应数据*/
export interface ResponseResult<T> {
	code: number;
	msg: string;
	result: T;
}
interface Pager {
	page: number;
	page_size: number;
	total_rows: number;
}
export interface ResponseListResult<T = any> {
	code: number;
	msg: string;
	result: {
		list: T;
		pager: Pager;
	};
}
