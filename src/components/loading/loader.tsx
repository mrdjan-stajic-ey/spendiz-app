import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {DEFAULT_TEXT_COLOR} from '../CONSTS';
import AppText from '../Text/AppText';
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export const AppLoader: React.FC<{}> = (): JSX.Element => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={DEFAULT_TEXT_COLOR} />
      <AppText type="NORMAL" text="Loading" />
    </View>
  );
};
