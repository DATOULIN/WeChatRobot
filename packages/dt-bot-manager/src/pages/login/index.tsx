import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { login } from '@/api/user';
import { useRequest } from 'ahooks';

const Login: React.FC = () => {
	const { run } = useRequest(login, {
		manual: true,
		onSuccess: (res) => {
			message.success('Login successfully.');
		}
	});

	const onFinish = (values: any) => {
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
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item label="Username" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
				<Input />
			</Form.Item>

			<Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
				<Input.Password />
			</Form.Item>

			<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					��¼
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Login;
