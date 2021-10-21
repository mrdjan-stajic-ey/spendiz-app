enum Language {
  EN_GB,
}

interface APP_TEXTS {
  loading: string;
  welcome: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  passwordLabel: string;
  usernameLabel: string;
  loginLabel: string;
  formLabels: {
    usernamePlaceholder: string;
    passwordPlaceholder: string;
  };
  formValidationErrors: {
    minLenght: string;
  };
  expenseChartHeading: string;
  categoriesSubtitle: string;
  balanceOverview: string;
  noSmsPermTitle: string;
  smsPermRequestTitle: string;
  smsRequestAcceptCTA: string;
  smsRequestDeclineCTA: string;
  smsRequestMessage: string;
  errorScreenMessage: string;
  accountSettingsTitle: string;
}

const ENGB_LANGUAGE: APP_TEXTS = {
  loading: 'Loading...',
  welcome: 'Welcome',
  welcomeTitle: 'Welcome to Spendzi',
  welcomeSubtitle: 'Track expenses, and spend money wisely!',
  loginLabel: 'Login',
  passwordLabel: 'Password',
  usernameLabel: 'Username',
  formValidationErrors: {
    minLenght: 'Must be atleast 6 characters.',
  },
  formLabels: {
    passwordPlaceholder: 'Password',
    usernamePlaceholder: 'Username',
  },
  expenseChartHeading: 'Chart view of your balance',
  categoriesSubtitle: 'Most frequent',
  balanceOverview: 'Ballance overview',
  noSmsPermTitle: 'The app requires the permissions for sms readings',
  smsPermRequestTitle: 'The app requires permission to read your Sms inbox',
  smsRequestAcceptCTA: 'Grant',
  smsRequestDeclineCTA: 'Reject',
  smsRequestMessage: '',
  errorScreenMessage: 'Something went wrong, contact the developer.',
  accountSettingsTitle: 'Select sms to start configuring',
};

const LANGUAGES = {
  [Language.EN_GB]: ENGB_LANGUAGE,
};

const getTextByLocale = (lang?: Language) =>
  lang ? LANGUAGES[lang] : LANGUAGES[Language.EN_GB];

export default getTextByLocale;
