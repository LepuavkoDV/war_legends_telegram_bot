import {
  Context,
  Input,
  Markup,
} from 'telegraf';
import { Update } from 'typegram';
import { ERepliesList } from '../ERepliesList';

export const onLangEn = (ctx: Context<Update>) => {
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('About War Legends', ERepliesList.aboutEn), Markup.button.callback('Beta testing', ERepliesList.betaEn)],
    [Markup.button.callback('News & Updates', ERepliesList.newsEn), Markup.button.callback('Android', ERepliesList.androidEn)],
    [Markup.button.callback('Social Networks', ERepliesList.socialEn), Markup.button.callback('iOS', ERepliesList.iosEn)],
    [Markup.button.callback('Registration', ERepliesList.registrationEn), Markup.button.callback('Download APK', ERepliesList.downloadEn)],
    [Markup.button.callback('Contacts', ERepliesList.contactsEn), Markup.button.callback('Community', ERepliesList.communityEn)],
  ]);
  ctx.sendPhoto(
    Input.fromURL('https://i.imgur.com/LpBQcfg.jpg'),
    {
      caption: `Select the action\\:`,
      parse_mode: 'MarkdownV2',
      ...buttons
    }
  );
};
