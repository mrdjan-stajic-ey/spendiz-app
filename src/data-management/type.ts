import {PhrasePart} from '../components/message/types';

export interface IPhraseContext {
  phrases: PhrasePart[];
  addPhrase: (word: PhrasePart) => void;
  categories: string[];
}

export interface IAppUser {
  user: {
    username: string; //TODO: fix this, there should be an entity for login req and enditity for user, or proper return from be;
    email: string;
  };
}

export interface IUserContext {
  user?: IAppUser;
  access_token?: string;
  clearUser: () => Promise<void>;
  setUser: (user: IAppUser) => void;
  loading: boolean;
}
