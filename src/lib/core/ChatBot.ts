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
import { TSupportedLocales } from './TSupportedLocales';
import { mainMenu } from '../actions/mainMenu';

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
    this.registerCommands();
    this.registerActions();
  }

  registerWelcomeMessage(): void {
    this.instance.start((ctx) => actions.start(ctx));
  }

  registerHelp(): void {
    this.instance.help((ctx) => actions.help(ctx));
  }

  registerCommands(): void {
    this.instance.command('quit', (ctx) => {
      // Explicit usage
      ctx.telegram.leaveChat(ctx.message.chat.id);
      // Context shortcut
      ctx.leaveChat();
    });
  }

  registerActions(): void {
    this.instance.on('callback_query', async (ctx) => {
      // @ts-ignore
      const { i18n } = ctx;
      const action: CallbackQuery.DataQuery = ctx.update.callback_query as CallbackQuery.DataQuery;

      const selectLangAction = async ($ctx: IActionContext<Update>, locale: TSupportedLocales) => {
        $ctx.session = { locale };
        i18n.locale($ctx.session?.locale || ESupportedLocales.en);
        await actions.mainMenu($ctx);
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
        await actions.socialNetworks(ctx);
        break;
      case EBotActionsList.actionAndroid:
        i18n.locale(ctx.session?.locale);
        await actions.android(ctx);
        break;
      case EBotActionsList.actionIOS:
        i18n.locale(ctx.session?.locale);
        await actions.ios(ctx);
        break;
      case EBotActionsList.actionContacts:
        i18n.locale(ctx.session?.locale);
        await actions.contacts(ctx);
        break;
      default:
        await actions.start(ctx);
        break;
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
