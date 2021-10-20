import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import getTextByLocale from '../app-resources/Language';
import {DEFAULT_TEXT_COLOR} from '../components/CONSTS';
import AppPage from '../components/page/AppPage';
import AppText from '../components/Text/AppText';

interface TSplashScreenProps extends IReactProps {
  splashError?: {(): any};
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

const SplashScreen: React.FC<TSplashScreenProps> = ({}): JSX.Element => {
  return (
    <AppPage>
      <View style={styles.splash}>
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={DEFAULT_TEXT_COLOR}
        />
        <AppText text={getTextByLocale().loading} />
      </View>
    </AppPage>
  );
};

export default SplashScreen;
