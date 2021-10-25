import {Center, Divider} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import {ISmsState} from '../../native-wrappers/types';
import AppPage from '../page/AppPage';
import AppText from '../Text/AppText';
import MessageContent from './MessageContent';
import {T_Parser_Props} from './types';

const styles = StyleSheet.create({
  title: {
    marginBottom: 5,
  },
});
const MessageParser: React.FC<T_Parser_Props> = ({route}): JSX.Element => {
  const {body, date_sent, id, sender}: ISmsState = route.params;
  //   console.log('Body parts', body.split(' '));
  return (
    <AppPage>
      <Center>
        <AppText
          style={styles.title}
          type="SUBTITLE"
          text={getTextByLocale().parserKeywordsTitle}
        />
      </Center>
      <Divider />
      <MessageContent date={date_sent} id={id} sender={sender} body={body} />
    </AppPage>
  );
};

export default MessageParser;
