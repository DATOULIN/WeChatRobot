import {log, Message} from "wechaty";
import * as PUPPET from "wechaty-puppet";
import globalConfig from "@/config/global";
import request from 'request'
import {setSchedule} from "@/core/job";

const {LOGPRE} = globalConfig
export const onMessage = async (message: Message) => {
  log.info(LOGPRE, `on message: ${message.toString()}`);
  const room = message.room(); // 是否是群消息
  switch (message.type()) {
    // 文字信息
    case PUPPET.types.Message.Text:
      room ? await roomMessage(message) : await privateMessage(message)
      break;
  }
}

// 处理群聊
const roomMessage = async (message: Message) => {
  const mentionSelf = await message.mentionSelf() // 是否是@我
  const room = message.room()!;
  const contact = message.talker(); // 发消息人
  const content = message.text().trim(); // 消息内容
  const topic = await room.topic();
  log.info(LOGPRE, `群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`);

  if (mentionSelf) {
    await message.say("hi,i am robot~")
  }
}

// 处理私聊
const privateMessage = async (message: Message) => {
  const contact = message.talker(); // 发消息人
  const content = message.text().trim(); // 消息内容
  const alias = await contact.alias() || contact.name(); // 发消息人备注
  log.info(LOGPRE, `发消息人: ${alias} 消息内容: ${content}`);
  await message.say("hi,i am robot~")
  setSchedule('*/10 * * * *', async () => {
    await message.say("hi,i am robot~")
  })
}

function requestRobot() {
  return new Promise((resolve, reject) => {
    let url = `https://chatbot.weixin.qq.com/openapi/sign/xGZUhBhYxFabJ9JIBOxqeA5FG4e0Ef?userid=555`;
    request.post(url, (error: any, response: any, body: any) => {
      console.log(body)
    });
  });
}

