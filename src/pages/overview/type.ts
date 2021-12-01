import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootNavigation, TTabOverviewLayout} from '../../routing/types';

export type T_Expenses_Props = NativeStackScreenProps<
  TRootNavigation,
  'BalanceOverview'
>;

export type T_Tab_Layout = NativeStackScreenProps<
  TTabOverviewLayout,
  'ExpansesOverview'
>;

export enum MODULE_TYPES {
  BALANCE = 'Balance',
  EXPENESE = 'Expenses',
  TRENDS = 'Trends',
  SAVINGS = 'Savings',
  SETTINGS = 'Account Settings',
}
