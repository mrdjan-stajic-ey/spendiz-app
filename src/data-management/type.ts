import {PhrasePart} from '../components/message/types';

export enum StorageKeys {
  USER = 'USER',
  JWT_TOKEN = 'JWT',
  REMEMBER_ME_CODE = 'REMEBER_ME_CODE',
  expiration_date = 'exp_date',
}

export interface IPhraseContext {
  phrases: PhrasePart[];
  addPhrase: (word: PhrasePart) => void;
  categories: string[];
}

export interface IAppUser {
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
