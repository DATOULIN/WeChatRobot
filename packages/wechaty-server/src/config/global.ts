const globalConfig = {
  LOGPRE: "[微信机器人]", // 打印时带的前缀
  /**
   * 自动添加好友关键词，留空代表同意任何好友请求
   */
  ACCEPTFRIEND: [],
  /**
   * 好友进群通知，可配置多个
   */
  ROOMJOINLIST: [{name: '微信机器人测试群', welcome: '欢迎新朋友，我叫肉报特，有事可以艾特我~'}],
}

export default globalConfig
