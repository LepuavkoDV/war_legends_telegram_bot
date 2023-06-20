import { TSupportedLocales } from '../lib/core/TSupportedLocales';

export const appStoreApplicationUrl = 'https://testflight.apple.com/join/RBbbx0rU';
export const playMarketApplicationUrl = 'https://play.google.com/store/apps/details?id=com.geargames.warlegends.rts.strategy.game';
export const socialNetworksUrls: Record<TSupportedLocales, Record<string, string>> = {
  en: {
    facebook: 'https://facebook.com/warlegendsrts',
    youtube: 'https://www.youtube.com/@warlegendsrts',
    twitter: 'https://twitter.com/WarLegendsRTS',
    discord: 'https://discord.gg/SbuJ2YAsPw',
    telegram: 'https://t.me/WarLegendsRTS',
  },
  ru: {
    facebook: 'https://www.google.com.ua/',
    youtube: 'https://www.google.com.ua/',
    twitter: 'https://www.google.com.ua/',
    discord: 'https://www.google.com.ua/',
    telegram: 'https://www.google.com.ua/',
  },
}
