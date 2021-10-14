enum Language {
  EN_GB,
}

interface APP_TEXTS {
  loading: string;
  welcome: string;
  welcomeTitle: string;
}

const ENGB_LANGUAGE: APP_TEXTS = {
  loading: 'Loading...',
  welcome: 'Welcome',
  welcomeTitle: 'Welcome to Spendzi',
};

const LANGUAGES = {
  [Language.EN_GB]: ENGB_LANGUAGE,
};

const getTextByLocale = (lang?: Language) =>
  lang ? LANGUAGES[lang] : LANGUAGES[Language.EN_GB];

export default getTextByLocale;
