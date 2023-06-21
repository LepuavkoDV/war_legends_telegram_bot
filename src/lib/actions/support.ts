import { Markup } from 'telegraf';
import { Update } from 'typegram';
import { IActionContext } from '../core/IActionContext';
import { supportEmail } from '../../config';
import { EBotActionsList } from '../core/EBotActionsList';

export const support = async (ctx: IActionContext<Update>) => {
  // @ts-ignore
  const { i18n } = ctx;
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback(`⬅️ ${i18n.t('mainMenu')}`, EBotActionsList.actionContacts)],
  ]);
  const text = `${i18n.t('contactsActionSupportCaption1')} ${supportEmail}. ${i18n.t('contactsActionSupportCaption2')}`;
  await ctx.reply(
    text,
    {
      // eslint-disable-next-line camelcase
      parse_mode: 'HTML',
      ...buttons,
    },
  );
}
