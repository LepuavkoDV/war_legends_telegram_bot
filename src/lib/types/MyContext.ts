import { Context } from 'telegraf';

interface SessionData {
  locale: string;
  // ... more session data go here
}

// eslint-disable-next-line
export interface MyContext<U> extends Context {
  session?: SessionData;
}
