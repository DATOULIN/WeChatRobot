import {onLogin} from "./onLogin";
import {onMessage} from "./onMessage";
import {onScan} from "./onScan";
import {Wechaty, WechatyBuilder} from "wechaty";
import globalConfig from "../config/global";

const {name} = globalConfig

const wechaty: Wechaty = WechatyBuilder.build({
  name,// 设置这个可以开启自动登录功能
  puppet: 'wechaty-puppet-wechat4u',
})

export {
  wechaty,
  onLogin,
  onMessage,
  onScan
}
