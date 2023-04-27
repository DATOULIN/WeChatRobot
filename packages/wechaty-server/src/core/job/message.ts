import {Message} from "wechaty";
import {chengyujielong, farceSwerve, hotWordSearch, rainbowFart, zimi} from "@/api/third-api";
import {replyTemplate} from "@/config/reply";

async function handleMessageReply(message: Message, text: string) {
  const selfContent = text.replace(/@[^,，：:\s@]+/g, '').trim()
  const userid = message.talker().name()
  console.log("===", userid)
  let reply: string
  switch (selfContent) {
    case '彩虹屁' :
      reply = await rainbowFart(selfContent) as any;
      await message.say(reply)
      break;
    case "搜索：":
      const sendText = selfContent.replace("搜索：", "")
      reply = await hotWordSearch(sendText) as any;
      await message.say(reply)
      break;
    case'脑筋急转弯':
      reply = await farceSwerve(selfContent) as any;
      const njResult = JSON.parse(reply)
      await message.say(`${njResult.content} \r\r\r 【10秒后公布答案】`);
      setTimeout(async () => {
        await message.say(`答案是：${njResult.result}`);
      }, 10000)
      break;
    case '猜字谜':
      reply = await zimi(selfContent) as any;
      const zimiResult = JSON.parse(reply)
      await message.say(`${zimiResult.content} \r\r\r 【10秒后公布答案】`);
      setTimeout(async () => {
        await message.say(`答案是：${zimiResult.answer} \r因为：${zimiResult.reason}`);
      }, 10000)
      break;
    // case '成语接龙':
    //   reply = await chengyujielong(selfContent, userid) as any;

    default:
      await message.say(replyTemplate.room)
      break;
  }
}

export {
  handleMessageReply
}
