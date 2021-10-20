import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootNavigation} from '../../routing/types';

export type T_Expenses_Props = NativeStackScreenProps<
  TRootNavigation,
  'BalanceOverview'
>;

export enum MODULE_TYPES {
  BALANCE = 'Balance',
  EXPENESE = 'Expenses',
  TRENDS = 'Trends',
  SAVINGS = 'Savings',
  SETTINGS = 'Account Settings',
}
