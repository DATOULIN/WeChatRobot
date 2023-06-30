import { LoginMachineContext } from '@/machine/login';

const useLogin = () => {
	const [state, send] = LoginMachineContext.useActor();
	// // 是否是登录中
	const isLoggingIn = LoginMachineContext.useSelector(() => state.value === 'loggingIn');
	// // 是否是登录状态
	const isLoggedIn = LoginMachineContext.useSelector(() => state.value === 'loggedIn');
	// // 登录状态
	const loginStatus = LoginMachineContext.useSelector(() => state);

	const handleLogin = (email: string, password: string) => {
		state.matches('idle') ? send({ type: 'LOGIN', email, password }) : send({ type: 'RETRY', email, password });
	};
	const handleLogout = () => {
		send({ type: 'LOGOUT' });
	};

	return {
		handleLogin,
		handleLogout,
		isLoggingIn,
		isLoggedIn,
		loginStatus,
		state,
		send
	};
};

export default useLogin;
