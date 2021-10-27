import React from 'react';
import {PhrasePart} from '../components/message/types';
// eslint-disable-next-line no-spaced-func
const PhrasesContext = React.createContext<{
  phrases: PhrasePart[];
  addPhrase: (word: PhrasePart) => void;
}>({
  phrases: [],
  addPhrase: () => {},
});

export default PhrasesContext;
