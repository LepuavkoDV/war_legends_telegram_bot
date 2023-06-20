import {
  Context,
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { ERepliesList } from '../types/ERepliesList';

export const onStart = (ctx: Context<Update>) => {
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('🇺🇸', ERepliesList.langEn), Markup.button.callback('🇷🇺', ERepliesList.langRu)],
  ]);
  ctx.sendPhoto(
    Input.fromLocalFile(`${__dirname}/../../assets/1.jpg`),
    {
      // @ts-ignore
      caption: ctx?.i18n?.t('start'),
      parse_mode: 'MarkdownV2',
      ...buttons
    }
  );
};
