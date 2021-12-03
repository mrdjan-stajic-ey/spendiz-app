import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {BACKGROUND_COLOR} from '../CONSTS';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
});
export interface IBarChart<T extends any> {
  labels: string[];
  datasets: [
    {
      data: T[];
    },
  ];
}

export type GroupedExpensesDataType = number;

export interface IGroupedExpensesBarChart
  extends IBarChart<GroupedExpensesDataType> {}

const chartConfig = {
  backgroundGradientFrom: BACKGROUND_COLOR,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#f0f5f2',
  backgroundGradientToOpacity: 0.3,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export const AppBarChart: React.FC<IGroupedExpensesBarChart> = ({
  datasets,
  labels,
}): JSX.Element => {
  console.log('Labels', labels);
  const [chartWidth, setChartWidth] = useState<number | null>(null);
  useEffect(() => {
    setChartWidth(screenWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.content}>
      {chartWidth && (
        <BarChart
          style={{}}
          width={screenWidth}
          chartConfig={chartConfig}
          height={280}
          yAxisLabel={'RSD'}
          yAxisSuffix={''}
          data={{labels, datasets}}
        />
      )}
    </View>
  );
};
