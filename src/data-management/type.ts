import {Category, PhrasePart} from '../components/message/types';

export enum StorageKeys {
  USER = 'USER',
  JWT_TOKEN = 'JWT',
  REMEMBER_ME_CODE = 'REMEBER_ME_CODE',
  expiration_date = 'exp_date',
}

export type TransactionType = 'INBOUND' | 'OUTBOUND';

export interface IPhraseContext {
  phrases: PhrasePart[];
  amountConfiguration: [number?, number?];
  addAmountConfiguration: (wordIndex: number) => void;
  addPhrase: (word: PhrasePart) => void;
  categories: Category[];
  toggleCategorySelection: (categoryId: string) => void;
  getSelectedCategories: () => Category[];
  transactionType: TransactionType;
  setTransactionType: (type: TransactionType) => void;
  rawSms: string;
  setRawSms: (sms: string) => void;
}

export interface IAppUser {
  access_token: string;
  user: {
    username: string; //TODO: fix this, there should be an entity for login req and enditity for user, or proper return from be;
    email: string;
    [key: string]: any;
  };
}

export interface IUserContext {
  userData?: IAppUser;
  access_token?: string;
  clearUser: () => Promise<void>;
  setUser: (user: IAppUser) => void;
  loading: boolean;
}
