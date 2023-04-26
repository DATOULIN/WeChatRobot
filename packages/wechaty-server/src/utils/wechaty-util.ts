import {log} from "wechaty";
import globalConfig from '@/config/global'

const {LOGPRE} = globalConfig
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
  sendMessageToRoom,
  sendMessageToUser,
  getAllContactList
}
