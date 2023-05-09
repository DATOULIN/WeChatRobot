import {getGameList} from "@/job/games";

const commonTemplate = {
  // 群艾特机器人的回复模板
  room: `
  你好哦~❤\n
  你可以艾特我，发送以下关键字
  1.【游戏】查看游戏列表\n
  就能知道我的本事啦~😙
  `,
  // 群艾特机器人【游戏】的回复模板
  games: `
  你好哦~❤\n
  你可以艾特我，发送以下关键字\n
  ${getGameList()}
  就能和我一起玩游戏啦🙌🤝~\n
  更多游戏敬请期待。。。😘
  `,
  private: ``,
  // 加群欢迎的回复模板 name：指定群名，welcome：欢迎消息
  roomJoinWelcomeList: [{name: '微信机器人测试群', welcome: '欢迎新朋友，我叫肉报特，有事可以艾特我~'}],
}

/**
 * 。。。秒后公布答案的模板
 * @param content 内容
 * @param time 延迟秒数
 * */
function getAnswerTemplate(content: string, time: number) {
  return `${content}\r\r\r 【${time / 1000}秒后公布答案】`
}

/***
 * 答案是。。。因为。。。的模板
 * @param result 答案
 * @param because 解释
 */
function resultAndBecauseTemplate(result: string, because: string) {
  return `答案是：${result}\r因为：${because}`
}

export {
  commonTemplate,
  getAnswerTemplate,
  resultAndBecauseTemplate
}
