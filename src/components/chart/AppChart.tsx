import React, {useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import AppPage from '../page/AppPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    flex: 1,
  },
});

const AppChart: React.FC<{}> = (): JSX.Element => {
  const [chartWidth, setChartWidth] = useState<number | null>(null);
  const width = useWindowDimensions().width;

  useEffect(() => {
    setChartWidth(width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppPage>
      <View style={styles.container}>
        {/* {chartWidth && (
          <LineChart
            style={[styles.chart, {width: chartWidth - 40}]}
            data={{
              dataSets: [
                {
                  //the fuck does this chart do.
                  label: 'The chart',
                  values: [
                    {x: 0, y: 10},
                    {x: 10, y: 130},
                    {x: 50, y: 200, marker: 'eat more'},
                    {x: 80, y: 125, marker: 'eat less'},
                    {x: 90, y: 20, marker: 'eat less'},
                    {x: 14, y: 5, marker: 'eat less'},
                  ],
                  config: {
                    mode: 'LINEAR',
                  },
                },
              ],
            }}
          />
        )} */}
      </View>
    </AppPage>
  );
};

export default AppChart;
