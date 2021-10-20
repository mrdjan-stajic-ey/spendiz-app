import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootNavigation} from '../../routing/types';

export type T_Expenses_Props = NativeStackScreenProps<
  TRootNavigation,
  'Expenses'
>;
export type IExpenseProps = T_Expenses_Props & {
  //other props here needed -  needed to go type route since navigation is passed like that
};
