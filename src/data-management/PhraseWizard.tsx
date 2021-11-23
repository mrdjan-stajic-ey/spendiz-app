import React, {useEffect, useState} from 'react';
import {Category, PhrasePart} from '../components/message/types';
import HttpReq from '../http/axios-wrapper';
import PhrasesContext from './PhraseContext';
import {TransactionType} from './type';

const PhraseWizard: React.FC<{}> = ({children}): JSX.Element => {
  const [selectedWords, setSelectedWords] = useState<PhrasePart[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [afixTouple, setAfixTouple] = useState<[PhrasePart?, PhrasePart?]>([]);
  const [transactionType, setTransactionType] =
    useState<TransactionType>('OUTBOUND');
  const [rawSms, setRawSms] = useState<string>('');
  useEffect(() => {
    const getCategories = async () => {
      HttpReq.get<Category[]>('/expense').then(data => {
        if (data) {
          setCategories(data);
        }
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

  /**
   * Sets the touples of afix and sufix, in the case that user tries to add more than 2 elements
	 the afix will become the suffix and the new word will become afix, last sufix is removed
   * @param phrase
   */
  const handleAfixSufix = (phrase: PhrasePart) => {
    //
    console.log('afix handling', phrase);
    switch (afixTouple.length) {
      case 0: {
        setAfixTouple([phrase]);
        break;
      }
      case 1: {
        const tmp = {...afixTouple[0]} as unknown as PhrasePart; //FML
        setAfixTouple(() => {
          return [tmp, phrase];
        });
        break;
      }
      case 2: {
        setAfixTouple(() => {
          return [afixTouple[1], phrase];
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  const rawSmsHandler = (sms: string) => {
    setRawSms(sms);
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
        amountConfiguration: afixTouple,
        addAmountConfiguration: handleAfixSufix,
        rawSms: rawSms,
        setRawSms: rawSmsHandler,
      }}>
      {children}
    </PhrasesContext.Provider>
  );
};

export default PhraseWizard;
