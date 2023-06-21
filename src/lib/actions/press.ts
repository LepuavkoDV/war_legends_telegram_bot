import {
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { IActionContext } from '../core/IActionContext';

export const press = async (ctx: IActionContext<Update>) => {
  // @ts-ignore
  const { i18n } = ctx;
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback(`⬅️ ${i18n.t('mainMenu')}`, i18n.languageCode)],
  ])
  await ctx.sendPhoto(
    Input.fromLocalFile(`${__dirname}/../../assets/4.jpg`),
    {
      caption: i18n.t('contactsActionCaption'),
      // eslint-disable-next-line camelcase
      parse_mode: 'MarkdownV2',
      ...buttons,
    },
  );
}
