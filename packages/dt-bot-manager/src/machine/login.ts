import { assign, createMachine, interpret, State } from 'xstate';
import { login, logout } from '@/api/user';
import { message } from 'antd';
import { clearToken, setToken } from '@/utils/cookie';
import { createActorContext } from '@xstate/react';
interface Context {
	retries: number;
	token: string;
	userId: string;
	email: string;
	password: string;
}

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
					LOGIN: 'loggingIn'
				}
			},
			loggingIn: {
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
					LOGOUT: 'loggingOut'
				}
			},
			loggingOut: {
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
						target: 'loggingIn',
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
				} else {
					throw new Error(response.msg || '登出失败');
				}
			}
		},
		actions: {
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
			}),
			logout: () => {
				clearToken();
				window.location.reload();
			},
			loginIn: (context) => {
				setToken(context.token);
			}
		}
	}
);

const loginInstance = interpret(loginMachine)
	.onTransition((state) => {
		// 返回是否改变，如果状态发生变化(或者 context 以及 action 后文提到)，返回 true
		console.log(state.changed);
		console.log(state.value);
	})
	// 完成时候触发
	.onDone(() => {
		console.log('done');
	});

const createState = (storeState: any, defaultContext: any) => {
	if (!storeState) return;
	const storedStateSubset = {
		_event: {},
		...storeState
	};
	if (!storeState.context) {
		storedStateSubset.context = defaultContext;
	}
	if (storeState.historyValue) {
		storedStateSubset.historyValue = storeState.historyValue;
	}
	return State.create(storedStateSubset as never);
};

const now = JSON.parse(localStorage.getItem('app-state')) || loginMachine.initialState;
const currentState = createState(now, loginMachine.context) as never;
loginInstance.start(currentState);

const LoginMachineContext = createActorContext(loginMachine, {
	devTools: true
});

export { loginMachine, loginInstance, LoginMachineContext, createState };
