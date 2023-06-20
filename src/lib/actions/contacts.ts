import {
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { IActionContext } from '../core/IActionContext';

export const contacts = async (ctx: IActionContext<Update>) => {
  await ctx.reply('contacts');
}
