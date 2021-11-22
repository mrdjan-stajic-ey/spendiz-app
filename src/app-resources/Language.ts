import {TransactionType} from '../data-management/type';

enum Language {
  EN_GB,
}

export interface APP_TEXTS {
  loading: string;
  welcome: string;
  loginCta: string;
  registerCta: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  passwordLabel: string;
  usernameLabel: string;
  welcomeRegisterSubtitle: string;
  registerDontHaveAnAcc: string;
  registerQuestion: string;
  loginLabel: string;
  formLabels: {
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    emailLabel: string;
    usenameLabel: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    registerButtonLabel: string;
  };
  login401: string;
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
  overviewKeywords: (transactionType: TransactionType) => string;
  overviewCategories: string;
  noCategoriesMessage: string;
  errorText: {
    localStorageErr: string;
    noJwtTokenFound: string;
    axiosTimeoutExceptionText: string;
    apiServiceFailed(path: string, error: string): string;
  };
}

const ENGB_LANGUAGE: APP_TEXTS = {
  loading: 'Loading...',
  welcome: 'Welcome',
  loginCta: 'Login',
  registerCta: 'Register',
  welcomeTitle: 'Welcome to Spendzi',
  welcomeSubtitle: 'Track expenses, and spend money wisely!',
  welcomeRegisterSubtitle: 'Sign up to maximise your savings',
  loginLabel: 'Login',
  passwordLabel: 'Password',
  usernameLabel: 'Username',
  login401: 'Invalid username or password',
  formValidationErrors: {
    minLenght: 'Must be at least 6 characters.',
  },
  formLabels: {
    passwordPlaceholder: 'Password',
    usernamePlaceholder: 'Username',
    emailLabel: 'Enter your email',
    passwordLabel: 'Enter desired password',
    confirmPasswordLabel: 'Confirm password',
    registerButtonLabel: 'Register',
    usenameLabel: 'Username',
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
  overviewKeywords: (transactionType: TransactionType) => {
    return `You have chosen the following phrases to ${
      transactionType === 'INBOUND' ? ' increase' : 'lower'
    } your balance amount`;
  },
  overviewCategories: 'And they are asociated with categories',
  registerDontHaveAnAcc: 'Register here',
  registerQuestion: 'Dont have an account',
  errorText: {
    localStorageErr:
      'Local storage operation failed, clear local storage and try running the app again',
    noJwtTokenFound: 'Jwt token not found, redirecting to login',
    axiosTimeoutExceptionText: 'Http client timeout exceded',
    apiServiceFailed: (path: string, error: string) =>
      `Api service on path ${path} failed with error ${error}`,
  },
  noCategoriesMessage: 'No categories found',
};

const LANGUAGES = {
  [Language.EN_GB]: ENGB_LANGUAGE,
};
//TODO: handle this better, this should return only strings and not the whole object that needs to be deconstructed latter
const getTextByLocale = (lang?: Language) =>
  lang ? LANGUAGES[lang] : LANGUAGES[Language.EN_GB];

export const getErrorTextByLocal = (lang?: Language) => {
  return getTextByLocale(lang).errorText;
};

export default getTextByLocale;
