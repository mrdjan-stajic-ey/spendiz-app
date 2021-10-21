import React from 'react';
import {IAppListProps} from '../../components/List/type';
import AppSmsMessage from '../../components/message/Message';
import {ISmsState} from '../../native-wrappers/types';

export const SMSAppList: IAppListProps<ISmsState> = {
  data: [],
  keyExtractor: item => item.date + '_' + item.id,
  renderItem: ({item}) => (
    <AppSmsMessage
      body={item.body}
      date_sent={item.date_sent}
      sender={item.sender}
    />
  ),
};
