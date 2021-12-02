import React from 'react';
import {IPhraseContext} from './type';
const PhrasesContext = React.createContext<IPhraseContext>({
  phrases: [],
  amountConfiguration: [],
  addAmountConfiguration: () => {},
  addPhrase: () => {},
  categories: [],
  toggleCategorySelection: () => {},
  getSelectedCategory: () => undefined,
  setTransactionType: () => {},
  transactionType: 'OUTBOUND',
  rawSms: '',
  setRawSms: () => {},
});

export default PhrasesContext;
