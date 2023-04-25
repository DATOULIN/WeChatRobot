import {Contact,Wechaty} from 'wechaty'

export const onLogin = async (user: Contact,wechaty:Wechaty) => {
  const allContactList = await wechaty?.Contact.findAll()!
  const allRooms = await wechaty.Room.findAll();
  const friendList = allContactList.filter(contact => contact.alias());
  console.log(friendList)
  console.log(allRooms)
  console.log('========================👉 onLogin 👈========================\n\n')
  console.log(`机器人：${user.name()} logged in\n\n`)
  console.log(`
                           //
               \\         //
                \\       //
        ##DDDDDDDDDDDDDDDDDDDDDD##
        ## DDDDDDDDDDDDDDDDDDDD ##      
        ## DDDDDDDDDDDDDDDDDDDD ##      
        ## hh                hh ##      ##         ## ## ## ##   ## ## ## ###   ##    ####     ##     
        ## hh    //    \\     hh ##      ##         ##       ##   ##             ##    ## ##    ##
        ## hh   //      \\    hh ##      ##         ##       ##   ##             ##    ##   ##  ##
        ## hh                hh ##      ##         ##       ##   ##     ##      ##    ##    ## ##
        ## hh      wwww      hh ##      ##         ##       ##   ##       ##    ##    ##     ####
        ## hh                hh ##      ## ## ##   ## ## ## ##   ## ## ## ###   ##    ##      ###
        ## MMMMMMMMMMMMMMMMMMMM ##    
        ##MMMMMMMMMMMMMMMMMMMMMM##      微信机器人名为: [${user.name()}] 已经扫码登录成功了。\n\n
        `)

}
