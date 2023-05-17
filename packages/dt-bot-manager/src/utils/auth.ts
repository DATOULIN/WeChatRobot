import Cookies from 'js-cookie';

const TokenKey = 'ACCESS_TOKEN';

export function getToken() {
	return Cookies.get(TokenKey);
}
