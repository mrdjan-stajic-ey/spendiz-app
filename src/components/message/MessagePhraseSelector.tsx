import {Center} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import PhrasesContext from '../../data-management/PhraseContext';
import HttpReq, {LOG_ERROR} from '../../http/axios-wrapper';
import AppButton from '../button/AppButton';
import {AppLoader} from '../loading/loader';
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
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ctaHolder: {},
  buttonCustomStyle: {
    borderColor: 'red',
  },
});

const MessagePhraseSelector: React.FC<IMessagePhraseSelector> = ({
  body,
  onContinue,
  phase,
}): JSX.Element => {
  const [bodyParts, setBodyParts] = useState<PhrasePart[]>([]);

  useEffect(() => {
    const getBodyParts = async () => {
      return HttpReq.post<PhrasePart[]>('text/split', {
        text: body,
        onlyUniques: true,
      })
        .then(data => {
          if (data) {
            setBodyParts(data);
          }
        })
        .catch(error => {
          LOG_ERROR('SPLIT_WORDS_FAILED', {error});
        });
    };
    getBodyParts();
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
      return selectedWords.length === 0 // i will allow this gibberish (pluralization of the words to be here)
        ? getTextByLocale().phrasesNextStepDisabled
        : `${getTextByLocale().phrasesNextStep} for ${
            selectedWords.length
          } word${selectedWords.length > 1 ? 's' : ''}`;
    }
  };

  const handlePillClick = (item: PhrasePart) => {
    addPhrase(item);
  };

  const handlePrefixAndSuffix = (item: number) => {
    console.log('index for prefix/sufix', item);
    addAmountConfiguration(item);
  };

  return (
    <Center style={styles.content}>
      <View style={styles.pillScrollViewContent}>
        <ScrollView>
          <View style={styles.pillContent}>
            {bodyParts.length > 0 &&
              bodyParts.map((stringPart, index) => {
                const isSelected = !!selectedWords.filter(
                  sw => sw.id === stringPart.id,
                )[0];
                const isSufixOrPrefix =
                  amountConfiguration[0] === index ||
                  amountConfiguration[1] === index;
                return (
                  <PillButton
                    onPress={() => {}}
                    key={stringPart.id}
                    selected={isSelected}
                    customStyle={
                      isSufixOrPrefix ? styles.buttonCustomStyle : {}
                    }
                    onSelect={
                      phase === 'KEYWORDS'
                        ? handlePillClick
                        : handlePrefixAndSuffix
                    }
                    text={stringPart.text}
                    data={phase === 'KEYWORDS' ? stringPart : index}
                  />
                );
              })}
            {bodyParts.length === 0 && <AppLoader />}
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
    </Center>
  );
};

export default MessagePhraseSelector;
