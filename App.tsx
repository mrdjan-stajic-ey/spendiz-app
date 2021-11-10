import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, AppRegistry, StyleSheet} from 'react-native';
import NotificationHandlerInstance from './src/app-resources/notificationHandler';
import AppStack from './src/routing/BasicRouting';
import {NativeBaseProvider} from 'native-base';
import {configureIconLibrary} from './src/components/icons-library/library';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from './src/pages/ErrorScreen';
import UserWrapper from './src/data-management/user/UserHoc';

if (!__DEV__) {
  //stop all the logs for performance since we can`t see them in prod
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

//Headlless js registration needs to be here;
AppRegistry.registerHeadlessTask('SmsTransfer', () =>
  require('./src/Sms_Handler'),
);

//icon library creation
configureIconLibrary();

const root_style = StyleSheet.create({
  root: {
    flex: 1,
  },
});
//Linear gradient needs to be required here since there is no out of the box solution for linear gradient for android/ios
const nb_config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const App = () => {
  useEffect(() => {
    NotificationHandlerInstance.setForegroundMessageHanled();
  }, []);
  return (
    <NativeBaseProvider config={nb_config}>
      <ErrorBoundary FallbackComponent={ErrorScreen}>
        <NavigationContainer>
          <SafeAreaView style={root_style.root}>
            <UserWrapper>
              <AppStack />
            </UserWrapper>
          </SafeAreaView>
        </NavigationContainer>
      </ErrorBoundary>
    </NativeBaseProvider>
  );
};

export default App;
