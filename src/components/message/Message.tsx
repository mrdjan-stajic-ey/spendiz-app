import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ISmsState} from '../../native-wrappers/types';
import AppIcon from '../Icon/AppIcon';
import AppText from '../Text/AppText';

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(220,220,220,0.4)',
    borderRadius: 20,
  },
  messageContent: {},
});
const AppSmsMessage: React.FC<
  Pick<ISmsState, 'body' | 'date_sent' | 'sender'>
> = ({body, date_sent, sender}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.holder}>
      <View>
        <AppText
          text={`Sent by - ${sender}`}
          numberOfLines={1}
          ellipsizeMode={'clip'}
        />
        <AppText text={body} numberOfLines={1} ellipsizeMode={'clip'} />
        <AppText text={new Date(+date_sent).toDateString()} />
      </View>
      <View>
        <AppIcon icon={faChevronCircleRight} />
      </View>
    </TouchableOpacity>
  );
};

export default AppSmsMessage;
