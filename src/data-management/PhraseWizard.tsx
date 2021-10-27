import React, {useState} from 'react';
import {PhrasePart} from '../components/message/types';
import PhrasesContext from './PhraseContext';

const PhraseWizard: React.FC<{}> = ({children}): JSX.Element => {
  const [selectedWords, setSelectedWords] = useState<PhrasePart[]>([]);
  const categories = [
    'Food',
    'Travel',
    'Work',
    'Med',
    'Lorem',
    'Ipsum',
    'Food',
    'Travel',
    'Work',
    'Med',
    'Lorem',
    'Ipsum',
    'Food',
    'Travel',
    'Work',
    'Med',
    'Lorem',
    'Ipsum',
    'Food',
    'Travel',
    'Work',
    'Med',
    'Lorem',
    'Ipsum',
  ];
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
  return (
    <PhrasesContext.Provider
      value={{
        phrases: selectedWords,
        addPhrase: addPhrase,
        categories: categories,
      }}>
      {children}
    </PhrasesContext.Provider>
  );
};

export default PhraseWizard;
