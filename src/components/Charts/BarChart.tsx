import React, {useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
});

export interface IBarChart {
  data: {
    dataSets: [
      {
        label: string;
        values: {[key: string]: any}[];
      },
    ];
    config: {
      barWidth: number;
    };
  };
}

export const AppBarChart: React.FC<IBarChart> = ({data}): JSX.Element => {
  const [chartWidth, setChartWidth] = useState<number | null>(null);
  const width = useWindowDimensions().width;
  const {config, dataSets} = data;
  useEffect(() => {
    setChartWidth(width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.content}>
      {chartWidth && (
        <BarChart
          style={[styles.chart, {width: chartWidth - 40}]}
          pinchZoom={false} //TODO: revise this;
          doubleTapToZoomEnabled={false}
          data={{
            dataSets,
            config: {
              ...config,
            },
          }}
        />
      )}
    </View>
  );
};
