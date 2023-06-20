import { ChatBot, IChatBot } from './lib/core/ChatBot';

const chatBot: IChatBot = new ChatBot(process.env.BOT_TOKEN)
// eslint-disable-next-line @typescript-eslint/no-empty-function
chatBot.launch().then(() => {});
