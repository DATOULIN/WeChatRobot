import {Contact} from 'wechaty'
import {sendMessageToRoom, sendMessageToUser} from "@/utils";


export async function onLogin(user: Contact, that: any) {
  // await sendMessageToUser("大头的头不大", "Hello World", that);
  await sendMessageToRoom("全国蛋仔四强", "hi,我上线了~", that);

  console.log(`微信机器人名为: [${user.name()}] 已经扫码登录成功了。`)
}
