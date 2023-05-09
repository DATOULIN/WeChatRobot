import { Message } from 'wechaty';
import { farceSwerve, rainbowFart, zimi } from '@/api/third-api';
import {
	getAnswerTemplate,
	resultAndBecauseTemplate
} from '@/template/commonTemplate';
import globalConfig from '@/config/global';

const { answerTime } = globalConfig;

interface BotGames {
	[key: string]: (message: Message, text: string) => Promise<any>;
}

/**
 * 游戏列表
 * */
const botGames: BotGames = {
	彩虹屁: async (message: Message, text: string) => {
		const reply = (await rainbowFart(text)) as any;
		await message.say(reply);
	},
	脑筋急转弯: async (message: Message, text: string) => {
		const reply = (await farceSwerve(text)) as any;
		const njResult = JSON.parse(reply);
		await message.say(getAnswerTemplate(njResult.content, answerTime));
		setTimeout(async () => {
			await message.say(`答案是：${njResult.result}`);
		}, answerTime);
	},
	猜字谜: async (message: Message, text: string) => {
		const reply = (await zimi(text)) as any;
		const zimiResult = JSON.parse(reply);
		await message.say(
			getAnswerTemplate(zimiResult.content.content, answerTime)
		);
		setTimeout(async () => {
			await message.say(
				resultAndBecauseTemplate(zimiResult.answer, zimiResult.reason)
			);
		}, answerTime);
	}
};

/**
 * 处理游戏关键字
 * @param message
 * @param keyWord 关键字
 * */
async function handleGame(message: Message, keyWord: string) {
	if (botGames[keyWord]) {
		return await botGames[keyWord](message, keyWord);
	}
}

/**
 * 获取游戏列表，并转成模板
 * */
function getGameList() {
	let str = '';
	Object.keys(botGames).forEach((v, index) => {
		str += `${index + 1}.【${v}】\n`;
	});
	return str;
}

export { handleGame, getGameList };
