import {
  Context,
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { ERepliesList } from '../ERepliesList';

export const onLangSelect = (ctx: Context<Update>) => {
  // @ts-ignore
  const i18n = ctx.i18n;
  const buttons = Markup.inlineKeyboard([
    [
      Markup.button.callback(i18n.t('about'), ERepliesList.about),
      Markup.button.callback(i18n.t('beta'), ERepliesList.beta)
    ],
    [
      Markup.button.callback(i18n.t('news'), ERepliesList.news),
      Markup.button.callback(i18n.t('android'), ERepliesList.android)
    ],
    [
      Markup.button.callback(i18n.t('social'), ERepliesList.social),
      Markup.button.callback(i18n.t('ios'), ERepliesList.ios)
    ],
    [
      Markup.button.callback(i18n.t('registration'), ERepliesList.registration),
      Markup.button.callback(i18n.t('downloadApk'), ERepliesList.download)
    ],
    [
      Markup.button.callback(i18n.t('contacts'), ERepliesList.contacts),
      Markup.button.callback(i18n.t('community'), ERepliesList.community)
    ],
  ]);
  ctx.sendPhoto(
    Input.fromLocalFile(`${__dirname}/../../assets/2.jpg`),
    {
      // @ts-ignore
      caption: ctx.i18n.t('selectActionCaption'),
      parse_mode: 'MarkdownV2',
      ...buttons
    }
  );
};
