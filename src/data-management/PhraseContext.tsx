import React from 'react';
import {IPhraseContext} from './type';
const PhrasesContext = React.createContext<IPhraseContext>({
  phrases: [],
  amountConfiguration: [],
  addAmountConfiguration: () => {},
  addPhrase: () => {},
  categories: [],
  toggleCategorySelection: () => {},
  getSelectedCategories: () => [],
  setTransactionType: () => {},
  transactionType: 'OUTBOUND',
});

export default PhrasesContext;
