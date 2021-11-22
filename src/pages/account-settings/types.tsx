import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IAppListProps} from '../../components/List/type';
import AppSmsMessage from '../../components/message/Message';
import {ISmsState} from '../../native-wrappers/types';
import {TConfigurationNavigation, TRootNavigation} from '../../routing/types';

export type T_Account_Settins = NativeStackScreenProps<
  TRootNavigation,
  'AccountSettings'
>;

export type T_PhraseProps = NativeStackScreenProps<
  TConfigurationNavigation,
  'Phrase'
>;

export interface IOverviewInfoItem extends Partial<TouchableOpacity> {
  content?: string;
  onPress?: () => void;
}

export type MessageDataParserMode = 'KEYWORDS' | 'AMOUNT_SELECTOR';

export const SMSAppList: IAppListProps<ISmsState> = {
  data: [],
  keyExtractor: item => item.date + '_' + item.id,
  renderItem: (
    {item}, //This is not used anymore
  ) => (
    <AppSmsMessage
      body={item.body}
      date_sent={item.date_sent}
      sender={item.sender}
      onItemClick={() => {
        console.log('Item click', item);
      }}
    />
  ),
};
