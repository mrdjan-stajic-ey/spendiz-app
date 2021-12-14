import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Center} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HttpReq, {LOG_ERROR} from '../../../http/axios-wrapper';
import {TTabOverviewLayout} from '../../../routing/types';
import {AppBarChart} from '../../Charts/BarChart';
import {AppLoader} from '../../loading/loader';
import AppPage from '../../page/AppPage';
import AppText from '../../Text/AppText';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    flex: 1,
  },
});

type T_Nav_Tab_Props = NativeStackScreenProps<
  TTabOverviewLayout,
  'ExpansesOverview'
>;

export const ExpensesSummed: React.FC<T_Nav_Tab_Props> = ({
  navigation,
}): JSX.Element => {
  const [data, setData] = useState<{labels: []; datasets: [{data: []}]}>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBarChartData = async () => {
    try {
      const _data = await HttpReq.get<{labels: []; datasets: [{data: []}]}>(
        'balance-action/group-expenses',
      );
      if (_data) {
        setData(_data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      LOG_ERROR('Failed getting bar chart data');
    }
  };

  useEffect(() => {
    const blurSubscriber = navigation.addListener('blur', () => {
      setIsLoading(true);
      setData(null);
    });
    const focusSubscriber = navigation.addListener('focus', () => {
      getBarChartData();
    });
    return () => {
      focusSubscriber;
      blurSubscriber;
    };
  }, [navigation]);

  return (
    <AppPage>
      <Center mb={5}>
        <AppText type="SUBTITLE" text="Grouped expenses by category" />
      </Center>
      <View style={styles.content}>
        {!isLoading && data?.labels && (
          <AppBarChart labels={data.labels} datasets={data.datasets} />
        )}
        {isLoading && <AppLoader />}
      </View>
    </AppPage>
  );
};
