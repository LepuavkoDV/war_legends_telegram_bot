import {
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { IActionContext } from '../core/IActionContext';
import { playMarketApplicationUrl } from '../../config';

export const android = async (ctx: IActionContext<Update>) => {
  // @ts-ignore
  const { i18n } = ctx;
  const buttons = Markup.inlineKeyboard([
    [Markup.button.url(`▶️ ${i18n.t('androidActionCta')}`, playMarketApplicationUrl)],
    [Markup.button.callback(`⬅️ ${i18n.t('mainMenu')}`, i18n.locale())],
  ])
  await ctx.sendPhoto(
    Input.fromLocalFile(`${__dirname}/../../assets/4.jpg`),
    {
      caption: i18n.t('androidActionCaption'),
      // eslint-disable-next-line camelcase
      parse_mode: 'MarkdownV2',
      ...buttons,
    },
  );
}
