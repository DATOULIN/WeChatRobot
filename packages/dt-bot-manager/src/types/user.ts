/**
 * 登录请求参数*/
export interface LoginParams {
	email: string;
	password: string;
}

/**
 * 登录响应参数*/
export interface LoginResponseData {
	access_token: string;
}

/**
 * 注册请求参数*/
export interface RegisterParams {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}
