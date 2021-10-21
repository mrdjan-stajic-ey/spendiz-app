import React from 'react';
import {StyleSheet, View} from 'react-native';
import getTextByLocale from '../app-resources/Language';
import AppLogo from '../components/Logo';
import AppPage from '../components/page/AppPage';
import AppText from '../components/Text/AppText';

const style = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ErrorScreen: React.ComponentType<{error: Error; resetError: () => void}> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({error, resetError}): JSX.Element => {
    return (
      <AppPage>
        <View style={style.content}>
          <AppLogo type="ERROR" />
          <AppText text={getTextByLocale().errorScreenMessage} />
          {error && <AppText text={error.toString()} type="SUBTITLE" />}
        </View>
      </AppPage>
    );
  };

export default ErrorScreen;
