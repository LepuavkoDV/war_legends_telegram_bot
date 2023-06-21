import {
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { IActionContext } from '../core/IActionContext';
import {
  supportEmail,
  contactEmail,
} from '../../config';

export const contacts = async (ctx: IActionContext<Update>) => {
  // @ts-ignore
  const { i18n } = ctx;
  const buttons = Markup.inlineKeyboard([
    [Markup.button.url(`⚙️ ${i18n.t('contactsActionSupportCta')}`, `mailto:${supportEmail}`)],
    [Markup.button.url(`✉️ ${i18n.t('contactsActionPressCta')}`, `mailto:${contactEmail}`)],
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
