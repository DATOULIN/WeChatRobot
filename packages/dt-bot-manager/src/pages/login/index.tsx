import React from 'react';
import { Button, Form, Input } from 'antd';
import { LoginParams } from '@/types/user';
import { useLoginMachine } from '@/machine/useLoginMachine';

const Login: React.FC = () => {
	const { state, send } = useLoginMachine();

	const onFinish = (values: LoginParams) => {
		const { email, password } = values;
		state.matches('idle') ? send({ type: 'LOGIN', email, password }) : send({ type: 'RETRY', email, password });
	};

	return (
		<Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} onFinish={onFinish} autoComplete="off">
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
