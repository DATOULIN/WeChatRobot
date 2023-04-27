import {sendMessageToRoom,sendMessageToUser} from "@/core/listener/onMessage";
import {scheduleList,setSchedule} from '@/job'

/***
 * 初始化每日任务
 * */
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
