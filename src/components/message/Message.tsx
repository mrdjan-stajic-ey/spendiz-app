import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ISmsState} from '../../native-wrappers/types';
import {BACKGROUND_ITEM_DEFAULT} from '../CONSTS';
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
    backgroundColor: BACKGROUND_ITEM_DEFAULT,
    borderRadius: 20,
  },
  messageContent: {
    flex: 1,
    padding: 5,
  },
});

interface IAppSmsMessage
  extends Pick<ISmsState, 'body' | 'date_sent' | 'sender'> {
  onItemClick: () => void;
}

const AppSmsMessage: React.FC<IAppSmsMessage> = ({
  body,
  date_sent,
  sender,
  onItemClick,
}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.holder} onPress={onItemClick}>
      <View style={styles.messageContent}>
        <AppText
          text={`Sent by - ${sender}`}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        />
        <View>
          <AppText text={body} numberOfLines={1} ellipsizeMode={'tail'} />
        </View>
        <AppText text={new Date(+date_sent).toDateString()} />
      </View>
      <View>
        <AppIcon icon={faChevronCircleRight} />
      </View>
    </TouchableOpacity>
  );
};

export default AppSmsMessage;
