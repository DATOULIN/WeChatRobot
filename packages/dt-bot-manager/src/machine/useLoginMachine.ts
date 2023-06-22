import { createMachine, assign, interpret } from 'xstate';
import { login, logout } from '@/api/user';
import { message } from 'antd';
import { setToken, clearToken } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';
import { useMachine } from '@xstate/react';

interface Context {
	retries: number;
	token: string;
	userId: string;
	email: string;
	password: string;
}

export const useLoginMachine = () => {
	const navigate = useNavigate();

	const loginMachine = createMachine<Context>(
		{
			/** @xstate-layout N4IgpgJg5mDOIC5QBsD2UCWA7AdBiyYAxADIDyA4gJIByA2gAwC6ioADqrBgC4apasQAD0QBGAGzicAZlmyArAA4A7OIAs6xWoA0IAJ5iATIoC+J3Wky40AQwjYoRCPzB4sAN1QBrV5ew5beywoBGxPAGMbXn5GJljBDi5ogSRhRDUVHGV5BlzVQwBOaQK1eWldAwRRZQKceTMLdH9AhyIwACd21HacNmQogDNugFsAputUOwdQj1RI5Nj41MSePhTQEQQM5SycvPFC4tLy-TFpQwaQPwmoGAgqLFJKMgBVABUl9k5V-kFN+Q0MgB1SKikM5zUhgqiEMykMOFKigUKnUmjUl2uOA6XXaRAASgBRN54gCanxAK2Sf0Q8nEohwhlEKPkhiUykUBVE0IQinp9UuWFQEDggmuCW+VNSmwAtOJubKMeM8AQwOKkmtqVsoacqtIpEo5IbDejzFclS1gmqfus0ghYfI6kjkaoNBkdDrRAx+Y0rGNbpAHlbJRtEOI4TgOUp5KJRNIWWUCtzDAwpLzWQxRLDRLT5KpFb7sd0gxqpaHw5HFNHY-HityCgwcAwnRoGBkCvWOWYzEA */
			id: 'login',
			initial: 'idle',
			context: {
				retries: 0,
				token: '',
				userId: '',
				email: '',
				password: ''
			},
			states: {
				idle: {
					on: {
						LOGIN: 'logining'
					}
				},
				logining: {
					invoke: {
						src: 'loginService',
						onDone: {
							target: 'loggedIn',
							actions: ['loginAssign', 'loginIn']
						},
						onError: 'error'
					}
				},
				loggedIn: {
					on: {
						LOGOUT: {
							target: 'logouting'
						}
					}
				},
				logouting: {
					invoke: {
						src: 'logoutService',
						onDone: {
							target: 'idle',
							actions: ['logoutAssign', 'logout']
						}
					}
				},
				error: {
					on: {
						RETRY: {
							target: 'logining',
							actions: 'retryAssign'
						}
					}
				}
			}
		},
		{
			services: {
				loginService: async (_, event) => {
					const { email, password } = event;
					const response = await login({ email, password });
					if (response.code === 0) {
						message.success('登录成功');
						return response.result;
					}
					throw new Error(response.msg || '登录失败');
				},
				logoutService: async () => {
					const response = await logout();
					if (response.code === 0) {
						message.success('登出成功');
					}
					throw new Error(response.msg || '登出失败');
				}
			},
			actions: {
				loginIn: (context) => {
					setToken(context.token);
					navigate('/', { replace: true });
				},
				logout: () => {
					clearToken();
				},
				loginAssign: assign({
					token: (_, event) => event.data.access_token,
					userId: (_, event) => event.data.user_id
				}),
				logoutAssign: assign({
					token: '',
					userId: ''
				}),
				retryAssign: assign({
					retries: (context) => context.retries + 1
				})
			}
		}
	);
	const loginInstance = interpret(loginMachine);
	const [state, send] = useMachine(loginMachine);
	return {
		state,
		send,
		loginInstance
	};
};
