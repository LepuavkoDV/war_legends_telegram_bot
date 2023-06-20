import {
  Context,
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { EBotActionsList } from '../types/EBotActionsList';

export const onStart = async (ctx: Context<Update>) => {
  // @ts-ignore
  const { i18n } = ctx;
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('🇺🇸', EBotActionsList.actionSelectLangEn), Markup.button.callback('🇷🇺', EBotActionsList.actionSelectLangRu)],
  ]);
  await ctx.sendPhoto(
    Input.fromLocalFile(`${__dirname}/../../assets/1.jpg`),
    {
      caption: i18n?.t('start'),
      // eslint-disable-next-line camelcase
      parse_mode: 'MarkdownV2',
      ...buttons,
    },
  );
};
