import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {BACKGROUND_COLOR} from '../CONSTS';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
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
  backgroundGradientToOpacity: 0.0,
  fillShadowGradient: 'skyblue', //TODO props this
  fillShadowGradientOpacity: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },

  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  formatYLabel: (e: any) => {
    return Math.floor(e);
  },
};

export const AppBarChart: React.FC<IGroupedExpensesBarChart> = ({
  datasets,
  labels,
}): JSX.Element => {
  const [chartWidth, setChartWidth] = useState<number | null>(null);
  useEffect(() => {
    setChartWidth(screenWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.content}>
      {chartWidth && (
        <BarChart
          width={screenWidth}
          //@ts-ignore ajde odjebi
          chartConfig={chartConfig}
          fromZero
          yAxisInterval={1} // optional, defaults to 1
          height={280}
          data={{labels, datasets}}
        />
      )}
    </View>
  );
};
