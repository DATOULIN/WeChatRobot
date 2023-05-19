import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { login } from '@/api/user';
import { LoginParams } from '@/types/user';
import { useRequest } from 'ahooks';
import { setToken } from '@/utils/cookie';
import { getVerificationCode } from '@/api/common';
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
	const navigate = useNavigate();
	const { run } = useRequest(login, {
		manual: true,
		onSuccess: (res) => {
			message.success('登录成功！');
			navigate('/', { replace: true });
			setToken(res.result.access_token);
		}
	});

	useRequest(getVerificationCode, { onSuccess: (res) => {} });

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
