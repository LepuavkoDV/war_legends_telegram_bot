import {
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { MyContext } from '../types/MyContext';

export const onSocial = async (ctx: MyContext<Update>) => {
  // @ts-ignore
  const { i18n } = ctx;
  const buttons = Markup.inlineKeyboard([
    [Markup.button.url('Facebook', 'https://facebook.com/warlegendsrts')],
    [Markup.button.url('YouTube', 'https://www.youtube.com/@warlegendsrts')],
    [Markup.button.url('Twitter', 'https://twitter.com/WarLegendsRTS')],
    [Markup.button.url('Discord', 'https://discord.gg/SbuJ2YAsPw')],
    [Markup.button.url('Telegram', 'https://t.me/WarLegendsRTS')],
    [Markup.button.callback(`⬅️ ${i18n.t('mainMenu')}`, i18n.languageCode)],
  ]);
  await ctx.sendPhoto(
    Input.fromLocalFile(`${__dirname}/../../assets/4.jpg`),
    {
      caption: i18n.t('onSocialTitle'),
      // eslint-disable-next-line camelcase
      parse_mode: 'MarkdownV2',
      ...buttons,
    },
  );
}
