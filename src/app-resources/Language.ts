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
  parserKeywordsTitle: string;
  phraseCTA: string;
  phrasesListTitle: string;
  phrasesNextStep: string;
  phrasesNextStepDisabled: string;
  phrasesAttributionTitle: string;
  phraseConfigurationTitle: string;
  phraseConfigurationDescription: string;
  phraseBalanceActionLabel: string;
  phraseBankAccActionAdd: string;
  phraseBankAccActionSubtract: string;
  phraseBankAccTypeLabel: string;
  phraseBalanceOverviewTitle: string;
  overviewKeywords: string;
  overviewCategodies: string;
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
  accountSettingsTitle: 'Choose a relevant SMS',
  parserKeywordsTitle: 'Select keywords',
  phraseCTA: 'Select a few words to create a phrase',
  phrasesListTitle: 'Selected phrases',
  phrasesNextStep: 'Define rules',
  phrasesNextStepDisabled: 'Please select at least one word',
  phrasesAttributionTitle: 'Define rules for selcted keywords',
  phraseConfigurationTitle: 'Map a keyword to action',
  phraseConfigurationDescription:
    'Map the colected phrase to the apropriate action on your bank account, then assing the category of expense or income',
  phraseBankAccActionAdd: 'Add to balance',
  phraseBankAccActionSubtract: 'Subtract from balance',
  phraseBankAccTypeLabel: 'Transaction type',
  phraseBalanceActionLabel: 'Add or subtract from balance',
  phraseBalanceOverviewTitle: 'Overview',
  overviewKeywords:
    'You have chosen the following phrases to manage your balance amount',
  overviewCategodies: 'And they are asociated with categories',
};

const LANGUAGES = {
  [Language.EN_GB]: ENGB_LANGUAGE,
};

const getTextByLocale = (lang?: Language) =>
  lang ? LANGUAGES[lang] : LANGUAGES[Language.EN_GB];

export default getTextByLocale;
