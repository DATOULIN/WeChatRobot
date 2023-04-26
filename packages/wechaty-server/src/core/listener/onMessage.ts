import {log, Message} from "wechaty";
import * as PUPPET from "wechaty-puppet";
import globalConfig from "@/config/global";
import {farceSwerve, hotWordSearch, rainbowFart} from '@/api/third-api'
import {replyFunction} from '@/config/reply'

const {LOGPRE} = globalConfig

// 监听消息
export const onMessage = async (message: Message) => {
  log.info(LOGPRE, `on message: ${message.toString()}`);
  const room = message.room(); // 是否是群消息
  room ? await roomMessage(message) : await privateMessage(message)
}

// 处理群聊
const roomMessage = async (message: Message) => {
  const mentionSelf = await message.mentionSelf() // 是否是@我
  const room = message.room()!;
  const contact = message.talker(); // 发消息人
  const content = message.text().trim(); // 消息内容
  const topic = await room.topic();
  log.info(LOGPRE, `群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`);
  const text = message.text()
  switch (message.type()) {
    // 文字信息
    case PUPPET.types.Message.Text:
      if (mentionSelf) {
        const selfContent = text.replace(/@[^,，：:\s@]+/g, '').trim()
        if (selfContent === '彩虹屁') {
          let reply = await rainbowFart(selfContent) as any;
          await message.say(reply)
        } else if (selfContent.includes("搜索：")) {
          const sendText = selfContent.replace("搜索：", "")
          let reply = await hotWordSearch(sendText) as any;
          await message.say(reply)
        } else if (selfContent === '脑筋急转弯') {
          let reply = await farceSwerve(selfContent) as any;
          const result = JSON.parse(reply)
          await room.say(`${result.content} \r\r\r 【10秒后公布答案】`);
          setTimeout(async () => {
            await room.say(`答案是：${result.result}`);
          }, 10000)
        } else if (['你有什么功能?', '你有什么功能', '你可以干嘛?', '你可以干嘛', '你会啥', '你会啥?'].includes(selfContent)) {
          await room.say(replyFunction.message)
        }
      }
      break;
  }
}

// 处理私聊
const privateMessage = async (message: Message) => {
  const contact = message.talker(); // 发消息人
  const content = message.text().trim(); // 消息内容
  const alias = await contact.alias() || contact.name(); // 发消息人备注
  log.info(LOGPRE, `发消息人: ${alias} 消息内容: ${content}`);

  switch (message.type()) {
    // 文字信息
    case PUPPET.types.Message.Text:
      // await message.say("Hi,i am robot~")
      break;
  }
}

