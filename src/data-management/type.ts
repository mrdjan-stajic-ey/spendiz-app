import {PhrasePart} from '../components/message/types';

export interface IPhraseContext {
  phrases: PhrasePart[];
  addPhrase: (word: PhrasePart) => void;
  categories: string[];
}
