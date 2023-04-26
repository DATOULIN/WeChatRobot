import {Friendship, log} from "wechaty";
import * as PUPPET from "wechaty-puppet";
import globalConfig from "@/config/global";

const {ACCEPTFRIEND, LOGPRE} = globalConfig

async function onFriendship(friendship: Friendship) {
  const name = friendship.contact().name()
  const hello = friendship.hello()
  const logMsg = name + '，发送了好友请求';
  if (friendship.type() === PUPPET.types.Friendship.Receive) {
    if (ACCEPTFRIEND.length == 0) {
      log.info(LOGPRE, '无认证关键词,30秒后将会自动通过好友请求', logMsg)
      await delay(30000);
      await friendship.accept();
    } else if (ACCEPTFRIEND.length > 0 && ACCEPTFRIEND.includes(hello)) {
      log.info(LOGPRE, `触发关键词${hello},3秒后自动通过好友请求`)
      await delay(3000);
      await friendship.accept();
    }
  }
}

export {
  onFriendship
}
