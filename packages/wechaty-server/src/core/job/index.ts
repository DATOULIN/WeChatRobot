import {sendMessageToRoom,sendMessageToUser} from "@/utils/wechaty-util";
import {scheduleList} from '@/config/schedule'
import {setSchedule} from "@/utils/schedule-util";
// 初始化任务
async function initEveryJob(that:any) {
  await sendMessageToRoom("微信机器人测试群", 'hi,我上线了~', that);

  scheduleList.forEach((item)=>{
    setSchedule(item.date, async () => {
      await sendMessageToRoom("微信机器人测试群", item.message, that);
    })
  })
}

export {
  initEveryJob
}
