import {Center} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import {ISmsState} from '../../native-wrappers/types';
import AppDivider from '../../components/divider/AppDivider';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import MessagePhraseSelector from '../../components/message/MessagePhraseSelector';
import {T_Parser_Props} from '../../components/message/types';

const styles = StyleSheet.create({
  title: {
    marginBottom: 5,
  },
});
const MessageParser: React.FC<T_Parser_Props> = ({
  route,
  navigation,
}): JSX.Element => {
  const {body, date_sent, id, sender}: ISmsState = route.params;
  const onContinueHandler = () => {
    navigation.navigate('Phrase');
  };
  return (
    <AppPage>
      <Center>
        <AppText
          style={styles.title}
          type="SUBTITLE"
          text={getTextByLocale().parserKeywordsTitle}
        />
      </Center>
      <AppDivider />
      <MessagePhraseSelector
        onContinue={onContinueHandler}
        date={date_sent}
        id={id}
        sender={sender}
        body={body}
      />
    </AppPage>
  );
};

export default MessageParser;
