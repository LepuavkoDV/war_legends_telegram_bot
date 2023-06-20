import {
  Context, Markup, Telegraf, Telegram, Input
} from 'telegraf';
import { Update } from 'typegram';
import {
  onStart,
  onHelp,
  onLangEn,
} from './lib/replies';
import {ERepliesList} from './lib/ERepliesList';

const { BOT_TOKEN } = process.env;
// const telegram: Telegram = new Telegram(BOT_TOKEN);
const bot: Telegraf<Context<Update>> = new Telegraf(BOT_TOKEN);
// const chatId: string = process.env.CHAT_ID as string;

bot.start((ctx) => onStart(ctx));

bot.help((ctx) => onHelp(ctx));

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);
  // Context shortcut
  ctx.leaveChat();
});

bot.on('callback_query', (ctx) => {
  const action = ctx.update.callback_query;
  switch (action.data) {
    case ERepliesList.langEn:
      onLangEn(ctx);
      break;
    default:
      onStart(ctx);
      break;
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
