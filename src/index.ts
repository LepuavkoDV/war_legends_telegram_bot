import {
  Context, Telegraf, session
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
} from './lib/replies';
import { ERepliesList } from './lib/ERepliesList';
import * as path from 'path';

const { BOT_TOKEN } = process.env;
const bot: Telegraf<Context<Update>> = new Telegraf(BOT_TOKEN);
const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  sessionName: 'session',
  useSession: true,
  allowMissing: false,
  directory: path.resolve(__dirname, 'locales')
})
bot.use(session());
bot.use(i18n.middleware());

bot.start((ctx) => onStart(ctx));

bot.help((ctx) => onHelp(ctx));

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);
  // Context shortcut
  ctx.leaveChat();
});

bot.on('callback_query', (ctx) => {
  const action: CallbackQuery.DataQuery = ctx.update.callback_query as CallbackQuery.DataQuery;
  switch (action.data) {
    case ERepliesList.langEn:
      // @ts-ignore
      ctx.i18n.locale('en');
      onLangSelect(ctx);
      break;
    case ERepliesList.langRu:
      // @ts-ignore
      ctx.i18n.locale('ru');
      onLangSelect(ctx);
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
