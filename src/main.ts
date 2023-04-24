import {log} from 'wechaty'
import {onLogin, onMessage, onScan, wechaty} from "./core";
import globalConfig from "./config/global";

const {LOGPRE} = globalConfig
wechaty
  .on('scan', onScan)
  .on('login', onLogin)
  .on('message', onMessage)
  .on("error", (error) => {
    log.error(LOGPRE, `on error: ${error}`);
  })
  .start().then(r => log.info(LOGPRE, "机器人启动啦~"))
