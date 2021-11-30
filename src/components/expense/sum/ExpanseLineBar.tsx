import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HttpReq, {LOG_ERROR} from '../../../http/axios-wrapper';
import {AppBarChart} from '../../Charts/BarChart';
import {AppLoader} from '../../loading/loader';
import AppPage from '../../page/AppPage';

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

export const ExpensesSummed: React.FC<{}> = (): JSX.Element => {
  const [barChartData, setBarChartData] = useState<any>(null);
  useEffect(() => {
    const getBarchartData = async () => {
      try {
        const bcData = await HttpReq.get<any>('balance-action/group-expenses');
        const resultData = [{x: 0, y: 6000, marker: ''}];
        for (let i = 0; i < Object.keys(bcData).length; i += 1) {
          const key = Object.keys(bcData)[i];
          const x = (i + 1) * 10;
          const y = bcData[key];
          const marker = key;
          resultData.push({x, y, marker});
        }
        console.log(resultData);
        setBarChartData(resultData);
      } catch (error) {
        LOG_ERROR('Failed getting bar chart data');
      }
    };
    getBarchartData();
  }, []);
  return (
    <AppPage>
      <View style={styles.content}>
        {barChartData && (
          <AppBarChart
            data={{
              config: {
                barWidth: 5,
              },
              dataSets: [
                {
                  label: 'Random bar chart',
                  values: barChartData,
                },
              ],
            }}
          />
        )}
        {!barChartData && <AppLoader />}
      </View>
    </AppPage>
  );
};
