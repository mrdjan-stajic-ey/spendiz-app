enum Language {
  EN_GB,
}

interface APP_TEXTS {
  loading: string;
  welcome: string;
  welcomeTitle: string;
  passwordLabel: string;
  usernameLabel: string;
  loginLabel: string;
  formValidationErrors: {
    minLenght: string;
  };
}

const ENGB_LANGUAGE: APP_TEXTS = {
  loading: 'Loading...',
  welcome: 'Welcome',
  welcomeTitle: 'Welcome to Spendzi',
  loginLabel: 'Login',
  passwordLabel: 'Password',
  usernameLabel: 'Username',
  formValidationErrors: {
    minLenght: 'Must be atleast 6 characters.',
  },
};

const LANGUAGES = {
  [Language.EN_GB]: ENGB_LANGUAGE,
};

const getTextByLocale = (lang?: Language) =>
  lang ? LANGUAGES[lang] : LANGUAGES[Language.EN_GB];

export default getTextByLocale;
