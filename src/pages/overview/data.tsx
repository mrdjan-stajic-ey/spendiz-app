import React from 'react';
import {Text, View} from 'react-native';
import {IExpenseItemV2} from '../../components/expense/typesv2';
import {IAppListProps} from '../../components/List/type';
import {MODULE_TYPES} from './type';

const IMAGE_BASE_URL = '../../app-resources/pictures/';
export const MODULES_INFO = [
  {
    src: require(`${IMAGE_BASE_URL}piepresentation.png`),
    name: MODULE_TYPES.EXPENESE,
    type: MODULE_TYPES.EXPENESE,
  },
  {
    src: require(`${IMAGE_BASE_URL}calcmoney.png`),
    name: MODULE_TYPES.BALANCE,
    type: MODULE_TYPES.BALANCE,
  },
  {
    src: require(`${IMAGE_BASE_URL}chart.png`),
    name: MODULE_TYPES.TRENDS,
    type: MODULE_TYPES.TRENDS,
  },
  {
    src: require(`${IMAGE_BASE_URL}creditcard.png`),
    name: MODULE_TYPES.SETTINGS,
    type: MODULE_TYPES.SETTINGS,
  },
  {
    src: require(`${IMAGE_BASE_URL}coins.png`),
    name: MODULE_TYPES.SAVINGS,
    type: MODULE_TYPES.SAVINGS,
  },
];

export const listData: IAppListProps<IExpenseItemV2> = {
  data: [
    {
      title: 'Wolt-rucak',
      type: 'LUNCH',
      amount: 100,
    },
    {
      title: 'Cigare',
      type: 'Lux',
      amount: 150,
    },
    {
      title: 'Zvake',
      type: 'Lux',
      amount: 150,
    },
    {
      title: 'GSP',
      type: 'Transport',
      amount: 154.56,
    },
    {
      title: 'Taksi',
      type: 'Transport',
      amount: 1500,
    },
    {
      title: 'Racuni',
      type: 'Life',
      amount: 2500,
    },
  ],
  keyExtractor: item => item.title,
  renderItem: ({item}) => {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{item.amount}</Text>
        <Text>{item.title}</Text>
        <Text>{item.type}</Text>
      </View>
    );
  },
};
