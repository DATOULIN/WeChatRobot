async function onRoomTopic(that: any) {
  let room = await that.Room.find({topic: "微信机器人测试群"});
  await room.say('干嘛改群名？快给我改回去！')
}

export {
  onRoomTopic
}
