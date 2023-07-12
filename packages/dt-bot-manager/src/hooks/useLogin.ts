import { LoginMachineContext } from '@/machine/login';
import { useEffect } from 'react';
import { setLoginState } from '@/utils/cache';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
	const [state, send] = LoginMachineContext.useActor();
	// // 是否是登录中
	const isLoggingIn = LoginMachineContext.useSelector(() => state.value === 'loggingIn');
	// // 是否是登录状态
	const isLoggedIn = LoginMachineContext.useSelector(() => state.value === 'loggedIn');
	// // 登录状态
	const loginStatus = LoginMachineContext.useSelector(() => state);

	const navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		state.matches('idle')
			? send({ type: 'LOGIN', email, password })
			: send({ type: 'RETRY', email, password });
	};
	const handleLogout = () => {
		send({ type: 'LOGOUT' });
	};

	useEffect(() => {
		console.log('当前状态：', isLoggedIn);
		const jsonState = JSON.stringify(state);
		setLoginState(jsonState);
		if (isLoggedIn) {
			navigate('/', { replace: true });
		}
	}, [isLoggedIn]);

	return {
		handleLogin,
		handleLogout,
		isLoggingIn,
		isLoggedIn,
		loginStatus
	};
};

export default useLogin;
