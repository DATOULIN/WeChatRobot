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

// 状态0为禁用、1为启用
type UserState = 0 | 1;

export interface UserListParams {
	email?: string;
	state?: UserState;
	page: number;
	page_size: number;
}

export interface UserDataType {
	user_id: string;
	id: string;
	email: string;
	username: string;
	phone: string;
	avatar: string;
	sex: 0 | 1;
	self_introduction: string;
	last_login_on: string;
	last_login_ip: string;
	// 0为普通用户 1为管理员
	user_type: 0 | 1;
	state: UserState;
	created_by: string;
	modified_by: string;
	deleted_by: string;
	created_on: string;
	modified_on: string;
	deleted_on: string;
}
