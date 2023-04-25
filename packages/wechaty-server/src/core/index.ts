import {Contact, log, Wechaty, WechatyBuilder} from "wechaty";

import {onLogin} from "./listener/onLogin";
import {onMessage} from "./listener/onMessage";
import {onScan} from "./listener/onScan";
import {onRoomJoin} from "@/core/listener/onRoomJoin";
import {onRoomTopic} from "@/core/listener/onRoomTopic";
import {onFriendship} from "@/core/listener/onFriendship";

import globalConfig from "@/config/global";

const {LOGPRE} = globalConfig

function createBot(): Wechaty {
  return WechatyBuilder.build({
    name: "WeChatRobotDemo",// 设置这个可以开启自动登录功能
    puppet: 'wechaty-puppet-wechat4u',
  })
}

function prepareBot() {
  const bot = createBot();
  bot
    .on('scan', onScan)
    // login 事件并不代表登录完全完成，只是通知目前登录的账号是什么，后续仍有初始化任务需要完成。
    .on('login', async function (user: Contact) {
      await onLogin(user, this)
    })
    // ！！！只有当 bot ready 才能保证 bot 已经完全登录且初始化成功，这之后才能调用 bot 各种API
    .on("ready", async function () {
      const allContactList = await this.Contact.findAll();

      const friendList = allContactList.filter(contact => contact.friend());
      console.log(friendList)
    })
    .on('message', onMessage)
    .on('room-topic', async function () {
      await onRoomTopic(this)
    })
    .on("room-join", onRoomJoin)
    .on("friendship", onFriendship)
    .on("error", (error) => {
      log.error(LOGPRE, `on error: ${error}`);
    })
    .on("logout", async function () {
      let room = await this.Room.find({topic: "微信机器人测试群"});
      await room.say("bye,我下线了~")
    })
    .start().then(r => log.info(LOGPRE, "机器人启动啦~"))
}

export {
  prepareBot,
}
