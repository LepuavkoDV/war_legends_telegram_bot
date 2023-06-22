import {
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { IActionContext } from '../core/IActionContext';
import { EBotActionsList } from '../core/EBotActionsList';

export const contacts = async (ctx: IActionContext<Update>) => {
  // @ts-ignore
  const { i18n } = ctx;
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback(`⚙️ ${i18n.t('contactsActionSupportCta')}`, EBotActionsList.actionContactsSupport)],
    [Markup.button.callback(`✉️ ${i18n.t('contactsActionPressCta')}`, EBotActionsList.actionContactsPress)],
    [Markup.button.callback(`⬅️ ${i18n.t('mainMenu')}`, i18n.locale())],
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
