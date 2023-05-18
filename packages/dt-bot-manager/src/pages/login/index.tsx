import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { login, LoginParams } from '@/api/user';
import { useRequest } from 'ahooks';
import { setToken } from '@/utils/cookie';
import { getVerificationCode } from '@/api/common';

const Login: React.FC = () => {
	const { run } = useRequest(login, {
		manual: true,
		onSuccess: (res) => {
			message.success('登录成功！');
			setToken(res.data);
		}
	});

	useRequest(getVerificationCode);

	const onFinish = (values: LoginParams) => {
		console.log('Success:', values);
		run(values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="用户名"
				name="email"
				rules={[
					{
						type: 'email',
						message: '邮箱格式不正确！'
					},
					{
						required: true,
						message: '请输入邮箱！'
					}
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码！' }]}>
				<Input.Password />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					登录
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Login;
