import { Message } from 'wechaty';
import { commonTemplate } from '@/template/commonTemplate';
import { handleGame } from '@/job/games';
async function handleMessageReply(message: Message, text: string) {
	const selfContent = text.replace(/@[^,，：:\s@]+/g, '').trim();
	const userid = message.talker().name();
	console.log('===', userid);
	// 处理游戏相关的关键字
	await handleGame(message, selfContent);
	switch (selfContent) {
		case '游戏':
			await message.say(commonTemplate.games);
			break;
		default:
			await message.say(commonTemplate.room);
			break;
	}
}

export { handleMessageReply };
