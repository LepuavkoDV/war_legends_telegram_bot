import { Context } from 'telegraf';
import { Update } from 'typegram';

export const help = async (ctx: Context<Update>) => {
  await Promise.all([
    ctx.reply('Send /start to receive a greeting'),
    ctx.reply('Send /help to see list of commands'),
  ]);
}
