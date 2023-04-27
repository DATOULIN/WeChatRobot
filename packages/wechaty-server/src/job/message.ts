import {farceSwerve, hotWordSearch, rainbowFart} from "@/api/third-api";
import {Message} from "wechaty";
import {defaultReply} from "@/config/reply.config";

// 关键词回复
async function handleKeyWordReply(message: Message, text: string) {
  let reply: string
  switch (text) {
    case '彩虹屁':
      reply = await rainbowFart(text) as any;
      await message.say(reply)
      break;
    case '搜索：':
      const sendText = text.replace("搜索：", "")
      reply = await hotWordSearch(sendText) as any;
      await message.say(reply)
      break;
    case '脑筋急转弯':
      reply = await farceSwerve(text) as any;
      const result = JSON.parse(reply)
      await message.say(`${result.content} \r\r\r 【10秒后公布答案】`);
      setTimeout(async () => {
        await message.say(`答案是：${result.result}`);
      }, 10000)
      break;
    default:
      await message.say(defaultReply.room)
      break;
  }
}

export {
  handleKeyWordReply
}
