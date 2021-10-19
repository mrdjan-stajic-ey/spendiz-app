import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import {TRootNavigation} from '../../routing/BasicRouting';

type T_Expenses_Props = NativeStackScreenProps<
  TRootNavigation,
  'BalanceOverview'
>;

const BalanceOverview: React.FC<T_Expenses_Props> = ({}): JSX.Element => {
  return (
    <AppPage>
      <AppText text="Mrdjan overview" />
    </AppPage>
  );
};

export default BalanceOverview;
