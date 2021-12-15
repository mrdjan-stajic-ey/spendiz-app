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
  amountSelectorTitle: string;
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
  amountAfixDescription: string;
  transactionToExpenseMappingDescription: string;
  overviewSignOffTitle: string;
  overviewConfigConfirmation: (afix: string, prefix: boolean) => string;
  overviewConfigurationAssumption: (amount: string) => string;
  overviewConfigurationQuestion: string;
  categoryInfluenceAdd: string;
  categoryInfluenceSubtract: string;
  reviewConfiguration: string;
  configurationCorrect: string;
  configurationWrong: string;
  overviewCTA: string;
}

const ENGB_LANGUAGE: APP_TEXTS = {
  loading: 'Loading...',
  welcome: 'Welcome',
  loginCta: 'Login',
  registerCta: 'Register',
  welcomeTitle: 'Welcome to Spendzi',
  welcomeSubtitle: 'Track expenses, and spend money wisely!',
  welcomeRegisterSubtitle: 'Sign up to maximize your savings',
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
  amountSelectorTitle: 'Confirm amount selectors',
  phraseCTA: 'Select a few words to create a phrase',
  phrasesListTitle: 'Selected phrases',
  phrasesNextStep: 'Define rules',
  phrasesNextStepDisabled: 'Please select at least one word',
  phrasesAttributionTitle: 'Define rules for selected keywords',
  phraseConfigurationTitle: 'Map a keyword to action',
  phraseConfigurationDescription:
    'Set the relations of the action, select food for food expenses, medical for medical, dont forget the paycheck!',
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
  overviewCategories: 'And they are associated with categories',
  registerDontHaveAnAcc: 'Register here',
  registerQuestion: 'Dont have an account',
  errorText: {
    localStorageErr:
      'Local storage operation failed, clear local storage and try running the app again',
    noJwtTokenFound: 'Jwt token not found, redirecting to login',
    axiosTimeoutExceptionText: 'Http client timeout exceeded',
    apiServiceFailed: (path: string, error: string) =>
      `Api service on path ${path} failed with error ${error}`,
  },
  noCategoriesMessage: 'No categories found',
  amountAfixDescription: 'Select key words from message to tag the expense',
  transactionToExpenseMappingDescription:
    'Select the two words from the message that just before and just after the amount that will affect your budget.',
  overviewSignOffTitle:
    'And they parsed the selected template message as following.',
  overviewConfigConfirmation: (affix: string, prefix: boolean) =>
    `Selected ${affix} as a ${prefix ? 'prefix' : 'suffix'}.`,
  overviewConfigurationAssumption: (amount: string) =>
    `Amount extracted from SMS ${amount} .`,
  overviewConfigurationQuestion: 'Is this correct?',
  categoryInfluenceAdd: 'Add',
  categoryInfluenceSubtract: 'Subtract',
  reviewConfiguration: 'Review configuration',
  configurationCorrect: 'This is correct',
  configurationWrong: 'Try again',
  overviewCTA: 'Finish',
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
