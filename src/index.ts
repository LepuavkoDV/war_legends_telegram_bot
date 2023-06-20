import {
  Telegraf,
  session,
} from 'telegraf';
import {
  CallbackQuery,
  Update,
} from 'typegram';
import TelegrafI18n from 'telegraf-i18n';
import {
  onStart,
  onHelp,
  onLangSelect,
  onSocial,
} from './lib/replies';
import { ERepliesList } from './lib/types/ERepliesList';
import * as path from 'path';
import { MyContext } from './lib/types/MyContext';

const { BOT_TOKEN } = process.env;
const bot: Telegraf<MyContext<Update>> = new Telegraf(BOT_TOKEN);
const telegrafI18n = new TelegrafI18n({
  defaultLanguage: 'en',
  sessionName: 'session',
  useSession: true,
  allowMissing: false,
  directory: path.resolve(__dirname, 'locales'),
})
bot.use(session());
bot.use(telegrafI18n.middleware());

bot.start((ctx) => onStart(ctx));
bot.help((ctx) => onHelp(ctx));
// bot.command('quit', (ctx) => {
//   // Explicit usage
//   ctx.telegram.leaveChat(ctx.message.chat.id);
//   // Context shortcut
//   ctx.leaveChat();
// });
bot.on('callback_query', (ctx) => {
  // @ts-ignore
  const { i18n } = ctx;
  const action: CallbackQuery.DataQuery = ctx.update.callback_query as CallbackQuery.DataQuery;

  switch (action.data) {
  case ERepliesList.actionSelectLangEn:
    ctx.session = { locale: 'en' };
    i18n.locale(ctx.session?.locale);
    onLangSelect(ctx);
    break;
  case ERepliesList.actionSelectLangRu:
    ctx.session = { locale: 'ru' };
    i18n.locale(ctx.session?.locale);
    onLangSelect(ctx);
    break;
  case ERepliesList.actionSocialNetworks:
    i18n.locale(ctx.session?.locale);
    onSocial(ctx);
    break;
  default:
    onStart(ctx);
    break;
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
