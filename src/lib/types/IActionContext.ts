import { Context } from 'telegraf';

interface ISessionData {
  locale: string;
  // ... more session data go here
}

// eslint-disable-next-line
export interface IActionContext<U> extends Context {
  session?: ISessionData;
}
