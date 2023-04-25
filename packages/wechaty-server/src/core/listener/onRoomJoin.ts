import {Contact, log, Room} from "wechaty";

async function onRoomJoin(room: Room, inviteeList: Contact[], inviter: Contact, date) {
  log.info(
    `on room join: ${room.toString()}, inviteeList: ${inviteeList.map((i) => i.id)}, inviter: ${
      inviter.id
    }, ${date}`
  );
  await room.say("欢迎新朋友，我叫肉报特，有事可以艾特我~")
}

export {
  onRoomJoin
}
