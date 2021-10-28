import {Center} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import {ISmsState} from '../../native-wrappers/types';
import AppDivider from '../../components/divider/AppDivider';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import MessagePhraseSelector from '../../components/message/MessagePhraseSelector';
import {T_Parser_Props} from '../../components/message/types';

const styles = StyleSheet.create({
  holder: {
    flex: 1,
  },
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
      <View style={styles.holder}>
        <Center>
          <AppText
            style={styles.title}
            type="TITLE"
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
      </View>
    </AppPage>
  );
};

export default MessageParser;
