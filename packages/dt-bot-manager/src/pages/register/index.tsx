import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { register } from '@/api/user';
import { useRequest } from 'ahooks';
import { RegisterParams } from '@/types/user';
import styles from './index.scss';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
	const { run } = useRequest(register, {
		manual: true,
		onSuccess: (res) => {
			message.success('注册成功！');
		}
	});

	const onFinish = (values: RegisterParams) => {
		run(values);
	};

	return (
		<div className={styles['register-page-warp']}>
			<div className={styles['register-form-wrap']}>
				<div className={styles['register-form-content']}>
					<h1>注册</h1>
					<Form requiredMark={false} name="basic" layout="vertical" onFinish={onFinish}>
						<Form.Item
							name="username"
							label="用户名"
							tooltip="What do you want others to call you?"
							rules={[{ required: true, message: '请输入用户名', whitespace: true }]}
						>
							<Input placeholder="请输入用户名" />
						</Form.Item>

						<Form.Item
							label="邮箱"
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
							<Input placeholder="请输入邮箱" />
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
							<Input.Password placeholder="请输入密码" />
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
							<Input.Password placeholder="请确认密码" />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								注册
							</Button>
						</Form.Item>

						<div>
							已有账号？<Link to="/login">去登录</Link>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Register;
