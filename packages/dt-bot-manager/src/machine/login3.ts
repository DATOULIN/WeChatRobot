import { createMachine, assign, interpret } from 'xstate';

const loginMachine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QBsD2UCWA7AdBiyYAxADIDyA4gJIByA2gAwC6ioADqrBgC4apasQAD0QBmAEwAWHADZRAVknyAjJIDso1ePkAaEAE9E26doYMAHMoCc40VbVqAvo71pMuAMYALMB4DW2FBEEPxgeFgAbqh+YW7YON6+AVhQCNhRHgCGvPyMTHmCHFw5AkjCiFaSyrKqagyiDGrmdgzieoYI4uJqOOZq8gwy8s3yopIMqs6u6PGJ-oHBoeFRMThxnj7zKWmRqFkleXTKLGVFPHyloCIIog04w7dqMlZ9qqLtiMryMjimDCqiGRDdSSSRTEDrHAAM0yGGQAFcAE7EAAqVAAsgBRMgAVRRBVOnHO-EE1wk0jkihU6k0km0HwQyn+OH6ZnUKnEyhkEzBLghM1wMLhSNRGOxeKOJ3YRJKpLEUlkCiUtVp9IMRnqLIGjXMgyswysMnMzj5WFQEDggnWhRlFzlCAAtDIGU7wZD8IQbcU7WVruIzDgGpyJv8LIDJO91Z1FFqzJYbHYni83QKEptklAvcTLuUEEDRDh7DYVNz5FIHAzrAxA6znuZhlIpMa+ZDYPCPB44PBCd6Sb7PhJqip-iM6QDzAz-eIcMpTBHDYOgyn3NDYQjkVnZf2EHTK5pY-81PquVYFMv4m5UPDuJufVdEPnC0ftFz-uW1AzLPczDzOfI6t8JqOEAA */
		id: 'login',
		initial: 'idle',
		context: {
			loginAttempts: 0
		},
		states: {
			idle: {
				on: {
					LOGIN: 'checking'
				}
			},
			checking: {
				entry: 'incrementLoginAttempts',
				invoke: {
					src: 'checkLoginStatus',
					onDone: [
						{
							target: 'success',
							cond: 'isLoginSuccessful'
						},
						{
							target: 'failure'
						}
					]
				}
			},
			success: {
				entry: 'resetLoginAttempts',
				type: 'final'
			},
			failure: {
				entry: 'incrementLoginAttempts',
				on: {
					TIMEOUT: [
						{
							target: 'logout',
							cond: 'isLoginAttemptsExceeded'
						},
						{
							target: 'checking'
						}
					]
				}
			},
			logout: {
				entry: 'logout',
				type: 'final'
			}
		}
	},
	{
		actions: {
			incrementLoginAttempts: assign({
				loginAttempts: (context) => context.loginAttempts + 1
			}),
			resetLoginAttempts: assign({
				loginAttempts: 0
			}),
			logout: () => {
				// 执行退出登录的操作
			}
		},
		guards: {
			isLoginSuccessful: (context, event) => {
				// 检查登录是否成功
				return event.data.success;
			},
			isLoginAttemptsExceeded: (context) => {
				// 检查登录尝试次数是否超过3次
				return context.loginAttempts >= 3;
			}
		},
		services: {
			checkLoginStatus: () => {
				// 执行检查登录状态的操作，并返回结果
				return new Promise((resolve) => {
					// 模拟异步操作
					setTimeout(() => {
						resolve({ success: true });
					}, 1000);
				});
			}
		}
	}
);

// 使用示例
const loginService = interpret(loginMachine)
	.onTransition((state) => console.log(state.value))
	.start();

loginService.send('LOGIN');
