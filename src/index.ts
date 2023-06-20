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
} from './lib/actions';
import { EBotActionsList } from './lib/types/EBotActionsList';
import * as path from 'path';
import { IActionContext } from './lib/types/IActionContext';
import { ESupportedLocales } from './lib/types/ESupportedLocales';

const { BOT_TOKEN } = process.env;
const bot: Telegraf<IActionContext<Update>> = new Telegraf(BOT_TOKEN);
const telegrafI18n = new TelegrafI18n({
  defaultLanguage: ESupportedLocales.en,
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
bot.on('callback_query', async (ctx) => {
  // @ts-ignore
  const { i18n } = ctx;
  const action: CallbackQuery.DataQuery = ctx.update.callback_query as CallbackQuery.DataQuery;

  const selectLangAction = async ($ctx: IActionContext<Update>, locale: string) => {
    $ctx.session = { locale };
    i18n.locale($ctx.session?.locale);
    await onLangSelect($ctx);
  }

  switch (action.data) {
  case EBotActionsList.actionSelectLangEn:
    await selectLangAction(ctx, ESupportedLocales.en);
    break;
  case EBotActionsList.actionSelectLangRu:
    await selectLangAction(ctx, ESupportedLocales.ru);
    break;
  case EBotActionsList.actionSocialNetworks:
    i18n.locale(ctx.session?.locale);
    await onSocial(ctx);
    break;
  default:
    await onStart(ctx);
    break;
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
