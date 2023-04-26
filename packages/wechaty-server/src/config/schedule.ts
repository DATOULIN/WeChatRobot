interface ScheduleList {
  name: string;
  date: string;
  isLoop: boolean;
  message: string;
  desc: string;
}

// 定时任务表
export const scheduleList: ScheduleList[] = [
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
