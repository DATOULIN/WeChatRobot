import {Contact} from 'wechaty'
import {sendMessageToRoom, sendMessageToUser} from "@/utils/wechaty-util";


export async function onLogin(user: Contact, that: any) {
  // await sendMessageToUser("大头的头不大", "Hello World", that);
  await sendMessageToRoom("微信机器人测试群", "hi,我上线了~", that);

  console.log(`微信机器人名为: [${user.name()}] 已经扫码登录成功了。`)
}
