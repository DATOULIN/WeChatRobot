import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { register } from '@/api/user';
import { useRequest } from 'ahooks';
import { RegisterParams } from '@/types/user';

const Register: React.FC = () => {
	const { run } = useRequest(register, {
		manual: true,
		onSuccess: (res) => {
			message.success('注册成功！');
		}
	});

	const onFinish = (values: RegisterParams) => {
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
				name="username"
				label="用户名"
				tooltip="What do you want others to call you?"
				rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
			>
				<Input />
			</Form.Item>

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

			<Form.Item
				name="password"
				label="密码"
				rules={[
					{
						required: true,
						message: '请输入密码！'
					}
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirmPassword"
				label="确认密码"
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: '请再次输入密码！'
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('两次密码不一致！'));
						}
					})
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					注册
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Register;
