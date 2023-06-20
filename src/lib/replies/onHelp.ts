import { Context } from 'telegraf';
import { Update } from 'typegram';

export const onHelp = (ctx: Context<Update>) => {
  ctx.reply('Send /start to receive a greeting');
  ctx.reply('Send /quit to stop the bot');
}
