import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import {ISmsState} from '../../native-wrappers/types';
import AppPage from '../../components/page/AppPage';
import MessagePhraseSelector from '../../components/message/MessagePhraseSelector';
import {T_Parser_Props} from '../../components/message/types';
import PageAppHeader from '../../components/header/AppPageHeader';
import {MessageDataParserMode} from './types';
import AppText from '../../components/Text/AppText';

const styles = StyleSheet.create({
  holder: {
    flex: 1,
  },
  title: {},
  explanation: {
    marginTop: 10,
    padding: 5,
  },
});

const MessageParser: React.FC<T_Parser_Props> = ({
  route,
  navigation,
}): JSX.Element => {
  const {body, date_sent, id, sender}: ISmsState = route.params;

  const [parserMode, setParserMode] =
    useState<MessageDataParserMode>('KEYWORDS');

  const hardwareBackButton = useCallback((): boolean | null | undefined => {
    if (parserMode === 'AMOUNT_SELECTOR') {
      setParserMode('KEYWORDS');
      return true;
    }
    return false;
  }, [parserMode]);

  useEffect(() => {
    const backHandlerEvent = BackHandler.addEventListener(
      'hardwareBackPress',
      hardwareBackButton,
    );
    return () => {
      backHandlerEvent.remove();
    };
  }, [hardwareBackButton]);

  const onContinueHandler = () => {
    if (parserMode === 'AMOUNT_SELECTOR') {
      navigation.navigate('Phrase');
    } else {
      setParserMode('AMOUNT_SELECTOR');
    }
  };

  const parserModeTextSection = () => {
    if (parserMode === 'AMOUNT_SELECTOR') {
      return (
        <AppText
          type="SUBTITLE"
          text="Select the two words from the message that encapsulates the amount that will affect your budget."
        />
      );
    }
    return (
      <AppText
        type="SUBTITLE"
        text="Select the words from message that will describe the category of expense."
      />
    );
  };

  return (
    <AppPage>
      <View style={styles.holder}>
        <PageAppHeader text={getTextByLocale().parserKeywordsTitle} />
        <View style={styles.explanation}>{parserModeTextSection()}</View>
        <MessagePhraseSelector
          phase={parserMode}
          onContinue={onContinueHandler}
          date={date_sent}
          id={id}
          sender={sender}
          body={body}
        />
      </View>
    </AppPage>
  );
};

export default MessageParser;
