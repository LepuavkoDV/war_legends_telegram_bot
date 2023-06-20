import {
  Context,
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { ERepliesList } from '../types/ERepliesList';

export const onLangSelect = async (ctx: Context<Update>) => {
  // @ts-ignore
  const i18n = ctx.i18n;
  const buttons = Markup.inlineKeyboard([
    [
      Markup.button.callback(`ℹ️ ${i18n.t('about')}`, ERepliesList.actionAbout),
      Markup.button.callback(`🧑‍💻 ${i18n.t('beta')}`, ERepliesList.actionBeta),
    ],
    [
      Markup.button.callback(`📰 ${i18n.t('news')}`, ERepliesList.actionNews),
      Markup.button.callback(`🤖 ${i18n.t('android')}`, ERepliesList.actionAndroid),
    ],
    [
      Markup.button.callback(`☑️ ${i18n.t('social')}`, ERepliesList.actionSocialNetworks),
      Markup.button.callback(`🍏 ${i18n.t('ios')}`, ERepliesList.actionIOS),
    ],
    [
      Markup.button.callback(`🌐 ${i18n.t('registration')}`, ERepliesList.actionRegistration),
      Markup.button.callback(`⬇️ ${i18n.t('downloadApk')}`, ERepliesList.actionDownloadAPK),
    ],
    [
      Markup.button.callback(`📩 ${i18n.t('contacts')}`, ERepliesList.actionContacts),
      Markup.button.callback(`💬 ${i18n.t('community')}`, ERepliesList.actionCommunity),
    ],
  ]);
  await ctx.sendPhoto(
    Input.fromLocalFile(`${__dirname}/../../assets/2.jpg`),
    {
      caption: i18n.t('selectActionCaption'),
      // eslint-disable-next-line camelcase
      parse_mode: 'MarkdownV2',
      ...buttons,
    },
  );
};
