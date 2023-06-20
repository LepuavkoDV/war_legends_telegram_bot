import { ChatBot, IChatBot } from './lib/core/ChatBot';

const chatBot: IChatBot = new ChatBot(process.env.BOT_TOKEN)
chatBot.launch().then(r => console.log(r));
