import {
  Context,
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { ERepliesList } from '../types/ERepliesList';

export const onStart = async (ctx: Context<Update>) => {
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('🇺🇸', ERepliesList.actionSelectLangEn), Markup.button.callback('🇷🇺', ERepliesList.actionSelectLangRu)],
  ]);
  await ctx.sendPhoto(
    Input.fromLocalFile(`${__dirname}/../../assets/1.jpg`),
    {
      // @ts-ignore
      caption: ctx?.i18n?.t('start'),
      // eslint-disable-next-line camelcase
      parse_mode: 'MarkdownV2',
      ...buttons,
    },
  );
};
