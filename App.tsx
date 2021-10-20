import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, AppRegistry, StyleSheet} from 'react-native';
import NotificationHandlerInstance from './src/app-resources/notificationHandler';
import AppStack from './src/routing/BasicRouting';
import {NativeBaseProvider} from 'native-base';
import {configureIconLibrary} from './src/components/icons-library/library';

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
      <NavigationContainer>
        <SafeAreaView style={root_style.root}>
          <AppStack />
        </SafeAreaView>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
