import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { LoginParams } from '@/types/user';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.scss';
import useLogin from '@/hooks/useLogin';

const Login: React.FC = () => {
	const { handleLogin, isLoggingIn, isLoggedIn, state } = useLogin();
	const navigate = useNavigate();

	const onFinish = (values: LoginParams) => {
		const { email, password } = values;
		handleLogin(email, password);
	};

	useEffect(() => {
		console.log('当前状态：', isLoggedIn);
		const jsonState = JSON.stringify(state);
		localStorage.setItem('app-state', jsonState);
		if (isLoggedIn) {
			navigate('/', { replace: true });
		}
	}, [isLoggedIn]);

	return (
		<div className={styles['login-page-warp']}>
			<div className={styles['login-page-content']}>
				<div className={styles['top-left-block']}></div>
				<div className={styles['login-form-wrap']}>
					<h1>欢迎登录</h1>
					<Form
						requiredMark={false}
						layout="vertical"
						name="basic"
						style={{ maxWidth: 600 }}
						onFinish={onFinish}
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
							<Input placeholder="邮箱" autoComplete="off" />
						</Form.Item>

						<Form.Item
							label="密码"
							name="password"
							rules={[{ required: true, message: '请输入密码！' }]}
						>
							<Input.Password placeholder="密码" />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit" disabled={isLoggingIn}>
								{isLoggingIn ? '登录中...' : '登录'}
							</Button>
						</Form.Item>

						<div>
							没有账号？<Link to="/register">创建账号</Link>
						</div>
					</Form>
				</div>
				<div className={styles['bottom-right-block']}></div>
			</div>
		</div>
	);
};

export default Login;
