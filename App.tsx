import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, AppRegistry, StyleSheet} from 'react-native';
import NotificationHandlerInstance from './src/app-resources/notificationHandler';
import {NativeBaseProvider} from 'native-base';
import {configureIconLibrary} from './src/components/icons-library/library';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from './src/pages/ErrorScreen';
import UserWrapper from './src/data-management/user/UserHoc';
import AuthStack from './src/routing/AuthStack';
import {BACKGROUND_COLOR} from './src/components/CONSTS';
import {AppDrawer} from './src/routing/AppStack';

if (!__DEV__) {
  //stop all the logs for performance since we can`t see them in prod
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  //TODO FYI Mrdjane ovo je i dalje sranje, ne treba da postoje console log/warn/err negde
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
        <NavigationContainer
          theme={{
            colors: {
              background: BACKGROUND_COLOR,
              border: null,
              card: null,
              notification: null,
              primary: null,
              text: null,
            },
            dark: false,
          }}>
          <AppDrawer />
        </NavigationContainer>
      </ErrorBoundary>
    </NativeBaseProvider>
  );
};

export default App;
