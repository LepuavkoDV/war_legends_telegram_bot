import { Telegraf, Context } from 'telegraf';
import { Update } from 'typegram';
import * as process from 'process';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN);
bot.start((context) => {
  context.reply('Hello this is War Legends RTS Bot');
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
