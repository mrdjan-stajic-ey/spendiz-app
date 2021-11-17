import React, {useEffect, useState} from 'react';
import {Category, PhrasePart} from '../components/message/types';
import HttpReq from '../http/axios-wrapper';
import PhrasesContext from './PhraseContext';
import {TransactionType} from './type';

const PhraseWizard: React.FC<{}> = ({children}): JSX.Element => {
  const [selectedWords, setSelectedWords] = useState<PhrasePart[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactionType, setTransactionType] =
    useState<TransactionType>('OUTBOUND');

  useEffect(() => {
    const getCategories = async () => {
      HttpReq.get<Category[]>('/expense').then(data => {
        setCategories(data);
      });
    };
    getCategories();
  }, []);

  const addPhrase = (item: PhrasePart) => {
    const {id} = item;
    if (selectedWords.find(sw => sw.id === id)) {
      setSelectedWords(() => {
        return selectedWords.filter(f => f.id !== id);
      });
    } else {
      setSelectedWords(() => {
        return [...selectedWords, item];
      });
    }
  };

  const toggleCategory = (categoryID: string) => {
    const categoryToToggle = categories.find(ct => ct.id === categoryID);
    if (categoryToToggle) {
      const _new_category: Category = {
        ...categoryToToggle,
        selected: !categoryToToggle?.selected,
      };
      const arrayIndexToReplace = categories
        .map(ct => ct.id)
        .indexOf(categoryID);
      setCategories(() => {
        return [
          ...categories.slice(0, arrayIndexToReplace),
          _new_category,
          ...categories.slice(arrayIndexToReplace + 1),
        ];
      });
    }
  };

  const getSelectedCategories = () => {
    return categories.filter(ct => ct.selected);
  };

  const handleSwitchChange = (data: TransactionType) => {
    setTransactionType(data);
  };

  return (
    <PhrasesContext.Provider
      value={{
        phrases: selectedWords,
        addPhrase: addPhrase,
        categories: categories,
        toggleCategorySelection: toggleCategory,
        getSelectedCategories,
        setTransactionType: handleSwitchChange,
        transactionType,
      }}>
      {children}
    </PhrasesContext.Provider>
  );
};

export default PhraseWizard;
