import {
  Context,
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { ERepliesList } from '../ERepliesList';

export const onStart = (ctx: Context<Update>) => {
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('🇺🇸', ERepliesList.langEn), Markup.button.callback('🇷🇺', ERepliesList.langRu)],
  ]);
  ctx.sendPhoto(
    Input.fromURL('https://i.imgur.com/LpBQcfg.jpg'),
    {
      caption: `Here you can follow the latest news and development progress of War Legends RTS\\. Select your language to get started\\:`,
      parse_mode: 'MarkdownV2',
      ...buttons
    }
  );
};
