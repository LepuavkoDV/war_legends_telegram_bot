import {
  Context,
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { EBotActionsList } from '../core/EBotActionsList';

export const mainMenu = async (ctx: Context<Update>) => {
  // @ts-ignore
  const i18n = ctx.i18n;
  const buttons = Markup.inlineKeyboard([
    [
      Markup.button.callback(`ℹ️ ${i18n.t('about')}`, EBotActionsList.actionAbout),
      Markup.button.callback(`🧑‍💻 ${i18n.t('beta')}`, EBotActionsList.actionBeta),
    ],
    [
      Markup.button.callback(`📰 ${i18n.t('news')}`, EBotActionsList.actionNews),
      Markup.button.callback(`🤖 ${i18n.t('android')}`, EBotActionsList.actionAndroid),
    ],
    [
      Markup.button.callback(`☑️ ${i18n.t('social')}`, EBotActionsList.actionSocialNetworks),
      Markup.button.callback(`🍏 ${i18n.t('ios')}`, EBotActionsList.actionIOS),
    ],
    [
      Markup.button.callback(`🌐 ${i18n.t('registration')}`, EBotActionsList.actionRegistration),
      Markup.button.callback(`⬇️ ${i18n.t('downloadApk')}`, EBotActionsList.actionDownloadAPK),
    ],
    [
      Markup.button.callback(`📩 ${i18n.t('contacts')}`, EBotActionsList.actionContacts),
      Markup.button.callback(`💬 ${i18n.t('community')}`, EBotActionsList.actionCommunity),
    ],
    [
      Markup.button.callback(`⬅️ ${i18n.t('mainMenu')}`, EBotActionsList.actionStart),
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
