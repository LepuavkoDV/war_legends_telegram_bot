import { Context } from 'telegraf';

interface SessionData {
  locale: string;
  // ... more session data go here
}

export interface MyContext<T> extends Context {
  session?: SessionData;
}
