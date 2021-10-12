import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import getTextByLocale from '../app-resources/Language';
import {DEFAULT_TEXT_COLOR} from '../components/CONSTS';
import AppText from '../components/Text/AppText';

interface TSplashScreenProps {
  children?: any;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    marginBottom: 20,
  },
});

const SplashScreen: React.FC<TSplashScreenProps> = (): JSX.Element => {
  return (
    <View style={styles.splash}>
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={DEFAULT_TEXT_COLOR}
      />
      <AppText> {getTextByLocale().loading} </AppText>
    </View>
  );
};

export default SplashScreen;
