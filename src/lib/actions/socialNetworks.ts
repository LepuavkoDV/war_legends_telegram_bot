import {
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { IActionContext } from '../core/IActionContext';
import { socialNetworksUrls } from '../../config';
import { TSupportedLocales } from '../core/TSupportedLocales';

export const socialNetworks = async (ctx: IActionContext<Update>) => {
  // @ts-ignore
  const { i18n } = ctx;
  const languageCode = i18n.locale() as TSupportedLocales;
  const urls = socialNetworksUrls[languageCode];
  const buttonsConfig: any = Object.keys(urls).map((key) => [Markup.button.url(`${key.charAt(0).toUpperCase()}${key.slice(1)}`, urls[key])]);
  buttonsConfig.push([Markup.button.callback(`⬅️ ${i18n.t('mainMenu')}`, languageCode)])
  const buttons = Markup.inlineKeyboard(buttonsConfig);
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
