import {Contact, log, Room} from "wechaty";
import {commonTemplate} from "@/template/commonTemplate";

const {roomJoinWelcomeList} = commonTemplate

/**
 * 判断配置中是否存在此群
 * @param {*} arr 配置的群组
 * @param {*} name 有新人的群名
 * @return {*} 配置中此群的下标，不存在此群返回-1
 */
function roomHasConfig(arr: any[], name: string): any {
  if (arr.length == 0) return -1
  for (let i in arr) {
    if (arr[i].name == name) return i
  }
  return -1
}

async function onRoomJoin(room: Room, inviteeList: Contact[], inviter: Contact, date) {
  const nameList = inviteeList.map(c => c.name()).join(',')
  const roomName = await room.topic()
  const roomIndex = roomHasConfig(roomJoinWelcomeList, roomName)
  if (roomIndex > -1) {
    log.info(`群名： ${roomName} ，加入新成员： ${nameList}, 邀请人： ${inviter}`, `${date}`);
    await room.say(`${roomName}：欢迎新朋友 @${nameList}，<br>${roomJoinWelcomeList[roomIndex].welcome}`)
  }
}

export {
  onRoomJoin
}
