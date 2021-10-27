import React from 'react';
import {IPhraseContext} from './type';
const PhrasesContext = React.createContext<IPhraseContext>({
  phrases: [],
  addPhrase: () => {},
  categories: [],
});

export default PhrasesContext;
