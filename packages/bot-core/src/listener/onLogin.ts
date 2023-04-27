import {Contact} from 'wechaty'

export async function onLogin(user: Contact, that: any) {
  console.log(`微信机器人名为: [${user.name()}] 已经扫码登录成功了。正在进行初始化`)
}
