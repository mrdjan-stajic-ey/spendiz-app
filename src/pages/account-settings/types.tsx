import React from 'react';
import {Text} from 'react-native';
import {IAppListProps} from '../../components/List/type';
import {ISmsState} from '../../native-wrappers/types';

export const SMSAppList: IAppListProps<ISmsState> = {
  data: [],
  keyExtractor: item => item.body + item.sender,
  renderItem: ({item}) => <Text>{`${item.sender} => ${item.body}`}</Text>,
};
