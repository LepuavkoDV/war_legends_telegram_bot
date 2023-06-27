import {
  Telegraf,
  session,
} from 'telegraf';
import {
  CallbackQuery,
  Update,
} from 'typegram';
import TelegrafI18n from 'telegraf-i18n';
import { actions } from '../actions';
import { EBotActionsList } from './EBotActionsList';
import * as path from 'path';
import { IActionContext } from './IActionContext';
import { ESupportedLocales } from './ESupportedLocales';

export interface IChatBot {
  instance: Telegraf<IActionContext<Update>>;
  launch(): Promise<void>;
  registerWelcomeMessage(): void;
  registerHelp(): void;
  registerCommands(): void;
  registerActions(): void;
}

export class ChatBot implements IChatBot {
  instance: Telegraf<IActionContext<Update>>;

  constructor(token: string) {
    this.instance = new Telegraf(token);

    const telegrafI18n = new TelegrafI18n({
      defaultLanguage: ESupportedLocales.en,
      sessionName: 'session',
      useSession: true,
      allowMissing: false,
      directory: path.resolve(__dirname, '../../locales'),
    })
    this.instance.use(session());
    this.instance.use(telegrafI18n.middleware());

    this.registerWelcomeMessage();
    this.registerHelp();
    // this.registerCommands();
    this.registerActions();
  }

  registerWelcomeMessage(): void {
    this.instance.start((ctx) => actions.start(ctx));
  }

  registerHelp(): void {
    this.instance.help((ctx) => actions.help(ctx));
  }

  registerCommands(): void {
    this.instance.telegram.setMyCommands([
      { command: 'start', description: 'Start conversation with bot.' },
      { command: 'help', description: 'Show list of available commands.' },
    ]);

    this.instance.command('quit', (ctx) => {
      // Explicit usage
      ctx.telegram.leaveChat(ctx.message.chat.id);
      // Context shortcut
      ctx.leaveChat();
    });
  }

  registerActions(): void {
    this.instance.on('callback_query', async (ctx) => {
      try {
        const action: CallbackQuery.DataQuery = ctx.update.callback_query as CallbackQuery.DataQuery;

        switch (action.data) {
        case EBotActionsList.actionSelectLangRu:
          ctx.session = { locale: ESupportedLocales.ru };
          ctx.i18n.locale(ESupportedLocales.ru);
          break;
        case EBotActionsList.actionSelectLangEn:
          ctx.session = { locale: ESupportedLocales.en };
          ctx.i18n.locale(ESupportedLocales.en);
          break;
        default:
          ctx.i18n.locale(ctx.session?.locale || ESupportedLocales.en);
          break;
        }

        switch (action.data) {
        case EBotActionsList.actionSocialNetworks:
          await actions.socialNetworks(ctx);
          break;
        case EBotActionsList.actionAndroid:
          await actions.android(ctx);
          break;
        case EBotActionsList.actionIOS:
          await actions.ios(ctx);
          break;
        case EBotActionsList.actionContacts:
          await actions.contacts(ctx);
          break;
        case EBotActionsList.actionContactsSupport:
          await actions.support(ctx);
          break;
        case EBotActionsList.actionContactsPress:
          await actions.press(ctx);
          break;
        case EBotActionsList.actionStart:
          await actions.start(ctx);
          break;
        case EBotActionsList.actionSelectLangRu:
        case EBotActionsList.actionSelectLangEn:
        default:
          await actions.mainMenu(ctx);
          break;
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  async launch(): Promise<void> {
    await this.instance.launch();
    // Enable graceful stop
    process.once('SIGINT', () => this.instance.stop('SIGINT'));
    process.once('SIGTERM', () => this.instance.stop('SIGTERM'));
  }
}
