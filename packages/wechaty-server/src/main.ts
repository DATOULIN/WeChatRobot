import {Contact, log, WechatyBuilder} from 'wechaty'
import {onLogin, onMessage, onScan} from "./core";
import globalConfig from "@/config/global";
import {groupIds} from "@/config/room";

const {LOGPRE, name} = globalConfig
const wechaty = WechatyBuilder.build({
  name,// 设置这个可以开启自动登录功能
  puppet: 'wechaty-puppet-wechat4u',
})
wechaty
  .on('scan', onScan)
  .on('login', (user: Contact) => onLogin(user,wechaty))
  .on('message', onMessage)
  .on('room-topic', async (room, topic, oldTopic, changer) => {
    if (room.id === groupIds.test) {
      await room.say('干嘛改群名？')
    }
  })
  .on("error", (error) => {
    log.error(LOGPRE, `on error: ${error}`);
  })
  .start().then(r => log.info(LOGPRE, "机器人启动啦~"))
