import React, {useEffect, useState} from 'react';
import {Category, PhrasePart} from '../components/message/types';
import HttpReq from '../http/axios-wrapper';
import PhrasesContext from './PhraseContext';
import {TransactionType} from './type';

const PhraseWizard: React.FC<{}> = ({children}): JSX.Element => {
  const [selectedWords, setSelectedWords] = useState<PhrasePart[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [afixTouple, setAfixTouple] = useState<[number?, number?]>([]);
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
    const _newItem = {...item, text: item.text};
    if (selectedWords.find(sw => sw.id === id)) {
      setSelectedWords(() => {
        return selectedWords.filter(f => f.id !== id);
      });
    } else {
      setSelectedWords(() => {
        return [...selectedWords, _newItem];
      });
    }
  };

  const toggleCategory = (categoryID: string) => {
    setCategories(() => {
      return [
        ...categories.map(c => {
          return {
            ...c,
            selected: categoryID === c.id,
          };
        }),
      ];
    });
  };

  const getSelectedCategory = () => {
    return categories.filter(ct => ct.selected)[0];
  };

  const handleSwitchChange = (data: TransactionType) => {
    setTransactionType(data);
  };

  /**
   * Sets the touples of afix and sufix, in the case that user tries to add more than 2 elements
	 the afix will become the suffix and the new word will become afix, last sufix is removed
   * @param phrase
   */
  const handleAfixSufix = (phraseIndex: number) => {
    switch (afixTouple.length) {
      case 0: {
        setAfixTouple([phraseIndex]);
        break;
      }
      case 1: {
        const tmp = afixTouple[0];
        setAfixTouple(() => {
          return [tmp, phraseIndex];
        });
        break;
      }
      case 2: {
        setAfixTouple(() => {
          return [afixTouple[1], phraseIndex];
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
        getSelectedCategory: getSelectedCategory,
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
