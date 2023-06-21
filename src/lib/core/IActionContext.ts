import { Context } from 'telegraf';
import TelegrafI18n from 'telegraf-i18n';

interface ISessionData {
  locale: string;
  // ... more session data go here
}

// eslint-disable-next-line
export interface IActionContext<U> extends Context {
  session?: ISessionData;
  i18n: TelegrafI18n;
}
