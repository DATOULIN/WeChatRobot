import {log, Message} from "wechaty";
import * as PUPPET from "wechaty-puppet";
import globalConfig from "@/config/global";
import {handleMessageReply} from "@/core/job/message";

const {LOGPRE} = globalConfig

// 监听消息
const onMessage = async (message: Message) => {
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
        await handleMessageReply(message, text)
      }
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

// 发送私聊消息
const sendMessageToUser = async (toUser: string, payload: string, that: any) => {
  let contact = await that.Contact.find({alias: toUser}) || await that.Contact.find({name: toUser}); // 获取你要发送的联系人
  if (contact) {
    await contact.say(payload)
  } else {
    log.info(LOGPRE, "找不到该好友！")
    return
  }
};

// 发送群消息
async function sendMessageToRoom(toRoom: string, payload: string, that: any) {
  let room = await that.Room.find({topic: toRoom});
  if (room) {
    await room.say(payload)
  } else {
    log.info(LOGPRE, "找不到该群！")
  }
}

// 获取所有联系人
async function getAllContactList(that: any) {
  const allContactList = await that.Contact.findAll();
  return allContactList.filter(contact => contact.friend())
}

// 获取所有群聊
async function getAllRoomList(that: any) {
  return await that.Room.findAll();
}

export {
  onMessage,
  sendMessageToRoom,
  sendMessageToUser,
  getAllContactList
}
