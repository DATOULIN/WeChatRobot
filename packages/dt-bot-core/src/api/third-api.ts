import qs from 'qs';
import request from 'request';
import globalConfig from '@/config/global';
import { commonApi } from '@/api/commonApiConfig';
import { random } from '@/utils';

const { txKey } = globalConfig;
// 彩虹屁
const rainbowFart = function (params: any) {
	return new Promise((resolve, reject) => {
		const url = `${commonApi.rainbowURL}?key=${txKey}` + qs.stringify(params);
		request.get(url, (params = params), function (error, response, body) {
			const data = JSON.parse(body);
			console.log(data);
			if (data.code == 200) {
				const content = data.newslist[0].content;
				resolve(content);
			} else {
				console.log('请求失败！');
				resolve('你在说什么，我听不懂');
			}
		});
	});
};

// 流行语
const hotWordSearch = (params: any) => {
	const search = {
		key: txKey,
		num: 10,
		word: params
	};
	return new Promise((resolve, reject) => {
		const url = `${commonApi.hotWordURL}?` + qs.stringify(search);
		request.get(url, function (error, response, body) {
			console.log(body);
			if (!body) {
				resolve('你在说什么，我听不懂');
			} else {
				const data = JSON.parse(body);
				if (data.code == 200) {
					const content = data.result.list[0].content;
					resolve(content);
				} else {
					console.log('请求失败！');
					resolve('你在说什么，我听不懂');
				}
			}
		});
	});
};

// 脑筋急转弯
const farceSwerve = (params: any) => {
	return new Promise((resolve, reject) => {
		const url =
			`${commonApi.farceSwerveURL}?key=${txKey}` + qs.stringify(params);

		request.get(url, (params = params), function (error, response, body) {
			const data = JSON.parse(body);
			console.log(data);
			if (data.code == 200) {
				const i = random(data.result.list.length);
				const content = data.result.list[i].quest;
				const result = data.result.list[i].result;
				resolve(
					JSON.stringify({
						content,
						result
					})
				);
			} else {
				console.log('请求失败！');
				resolve('你在说什么，我听不懂');
			}
		});
	});
};

// 菜字谜
const zimi = (params: any) => {
	const search = {
		key: txKey
	};
	return new Promise((resolve, reject) => {
		const url = `${commonApi.zimi}?` + qs.stringify(search);
		request.get(url, (params = params), function (error, response, body) {
			console.log(body);
			if (!body) {
				resolve('你在说什么，我听不懂');
			} else {
				const data = JSON.parse(body);
				if (data.code == 200) {
					const content = data.result;
					resolve(JSON.stringify(data.result));
				} else {
					console.log('请求失败！');
					resolve('你在说什么，我听不懂');
				}
			}
		});
	});
};

// 成语接龙
const chengyujielong = (params: any, userid: any) => {
	const search = {
		key: txKey,
		num: 10,
		word: params,
		userid: userid
	};
	return new Promise((resolve, reject) => {
		const url = `${commonApi.zimi}?` + qs.stringify(search);
		request.get(url, (params = params), function (error, response, body) {
			console.log(body);
			if (!body) {
				resolve('你在说什么，我听不懂');
			} else {
				const data = JSON.parse(body);
				if (data.code == 200) {
					const content = data.result;
					resolve(JSON.stringify(data.result));
				} else {
					console.log('请求失败！');
					resolve('你在说什么，我听不懂');
				}
			}
		});
	});
};
export { rainbowFart, hotWordSearch, farceSwerve, zimi, chengyujielong };
