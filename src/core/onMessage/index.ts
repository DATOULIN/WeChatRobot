import {log, Message} from "wechaty";
import * as PUPPET from "wechaty-puppet";
import globalConfig from "../../config/global";
import {groupIds} from "../../config/room";

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
  const room = message.room()!;
  const contact = message.talker(); // 发消息人
  const content = message.text().trim(); // 消息内容
  const topic = await room.topic();
  log.info(LOGPRE, `群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`);
  if (room.id === groupIds.danZai) {
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
}

