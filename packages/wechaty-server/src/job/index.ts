const schedule = require('node-schedule')

interface ScheduleList {
  name: string;
  date: string;
  isLoop: boolean;
  message: string;
  desc: string;
}

// 定时任务表
 const scheduleList: ScheduleList[] = [
  {
    name: '测试10分钟发个消息',
    date: '*/10 * * * *',
    isLoop: false,
    message: '你好，我说机器人，这是一条测试消息~',
    desc: ''
  },
  {
    name: '每天早上8点问候',
    date: '* * 8 * * *',
    isLoop: false,
    message: '早上好，今天又是活力满满的一天~',
    desc: ''
  },
  {
    name: '每天晚上22点问候',
    date: '* * 22 * * *',
    isLoop: false,
    message: '晚上好，累了一天注意早点休息~',
    desc: ''
  },
  {
    name: '每个月30号抄水电表',
    date: '* * * 30 * *',
    isLoop: false,
    message: '记得抄水电~',
    desc: ''
  }
]


/**
 * 设置定时器
 * @param {*} date 日期
 * @param {*} callback 回调
 */

//其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解    *代表通配符
//
// *  *  *  *  *  *
// ┬  ┬  ┬  ┬  ┬  ┬
// │  │  │  │  │  |
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

function setSchedule(date: string, callback: () => void) {
  schedule.scheduleJob(date, callback)
}

export {
  setSchedule,
  scheduleList
}


