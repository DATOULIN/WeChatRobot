const schedule = require('node-schedule');
/**
 * 延时函数
 * @param {*} ms 毫秒
 */
async function delay(ms: number): Promise<any> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param maxL 多少以内的随机数
 * @param params 可选参数：传入一个对象，
 * 包含min max length，
 * min max表示min-max范围的随机数，不传则为0-maxL的随机数
 * length表示取几个随机数的值，默认为1
 * */
function random(
	maxL: number,
	params?: { min: number; max: number; length: number }
): number {
	params = { ...{ length: 1, min: 1, max: maxL }, ...params };
	let { length, min, max } = params;
	if (
		typeof length != 'number' ||
		typeof min != 'number' ||
		typeof max != 'number' ||
		max <= min ||
		length <= 0
	) {
		return 0;
	}
	if (max - min < length) {
		length = max - min + 1;
	}
	const arr: any[] = [];
	for (let i = 0; i < length; i++) {
		const num = Math.round(Math.random() * (max - min)) + min;
		if (!arr.includes(num)) {
			arr.push(num);
		} else {
			i -= 1;
		}
	}
	return arr[0];
}

/**
 * 设置定时器
 * @param {*} date 日期
 * @param {*} callback 回调
 */

/**其他规则见 https://www.npmjs.com/package/node-schedule
 // 规则参数讲解    *代表通配符
 // *  *  *  *  *  *
 // ┬  ┬  ┬  ┬  ┬  ┬
 // │  │  │  │  │  │
 // │  │  │  │  │  └ day of week (0 - 7) (0 or 7 is Sun)
 // │  │  │  │  └───── month (1 - 12)
 // │  │  │  └────────── day of month (1 - 31)
 // │  │  └─────────────── hour (0 - 23)
 // │  └──────────────────── minute (0 - 59)
 // └───────────────────────── second (0 - 59, OPTIONAL)

 // 每分钟的第30秒触发： '30 * * * * *'
 //
 // 每小时的1分30秒触发 ：'30 1 * * * *'
 //
 // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
 //
 // 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
 //
 // 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
 */

function setSchedule(date: string, callback: () => void) {
	schedule.scheduleJob(date, callback);
}

export { delay, random, setSchedule };
