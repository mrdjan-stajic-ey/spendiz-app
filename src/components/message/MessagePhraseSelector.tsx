import React, {useContext, useMemo} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import PhrasesContext from '../../data-management/PhraseContext';
import {tokenize} from '../../utils/main';
import AppButton from '../button/AppButton';
import PillButton from '../pill/Pill';
import {IMessagePhraseSelector, PhrasePart} from './types';

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    flex: 1,
  },
  pillScrollViewContent: {
    flex: 4,
    marginBottom: 10,
    padding: 5,
  },
  pillContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ctaHolder: {},
  buttonCustomStyle: {
    borderColor: 'red', //TODO: HAAAAAACK HAAAAAACK HAAAAACK
  },
});

const MessagePhraseSelector: React.FC<IMessagePhraseSelector> = ({
  body,
  onContinue,
  phase,
}): JSX.Element => {
  const bodyParts: PhrasePart[] = useMemo(() => {
    return tokenize(body);
  }, [body]);

  const {
    phrases: selectedWords,
    addPhrase,
    amountConfiguration,
    addAmountConfiguration,
  } = useContext(PhrasesContext);

  const buttonText = () => {
    if (phase === 'AMOUNT_SELECTOR') {
      return getTextByLocale().amountSelectorTitle;
    } else {
      return selectedWords.length === 0 // i will allow this giberish (pluralization of the words to be here)
        ? getTextByLocale().phrasesNextStepDisabled
        : `${getTextByLocale().phrasesNextStep} for ${
            selectedWords.length
          } word${selectedWords.length > 1 ? 's' : ''}`;
    }
  };

  const handlePillClick = (item: PhrasePart) => {
    addPhrase(item);
  };

  const handlePrefixAndSufix = (item: PhrasePart) => {
    addAmountConfiguration(item);
  };

  return (
    <View style={styles.content}>
      <View style={styles.pillScrollViewContent}>
        <ScrollView>
          <View style={styles.pillContent}>
            {bodyParts.map(stringPart => {
              const isSelected = !!selectedWords.filter(
                sw => sw.id === stringPart.id,
              )[0];
              const isSufixOrPrefix =
                amountConfiguration.find(sc => sc?.text === stringPart.text) ||
                false;
              return (
                <PillButton
                  onPress={() => {}}
                  key={stringPart.id}
                  selected={isSelected}
                  customStyle={isSufixOrPrefix ? styles.buttonCustomStyle : {}}
                  onSelect={
                    phase === 'KEYWORDS'
                      ? handlePillClick
                      : handlePrefixAndSufix
                  }
                  text={stringPart.text}
                  data={stringPart}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.ctaHolder}>
        <AppButton
          onPress={onContinue}
          disabled={selectedWords.length === 0}
          borderRadius={50}
          text={buttonText()}
        />
      </View>
    </View>
  );
};

export default MessagePhraseSelector;
