import {initEveryJob} from "@/core/job";
import {getAllContactList} from "@/utils/wechaty-util";
import {log} from "wechaty";
import globalConfig from "@/config/global";

const {LOGPRE} = globalConfig
async function onReady(that: any) {
  log.info(LOGPRE, "========初始化完成========")
  const friendList = await getAllContactList(that)
  log.info(LOGPRE, friendList)
  // 初始化任务
  // await initEveryJob(that)
}

export {
  onReady
}
