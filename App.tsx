import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, AppRegistry, StyleSheet} from 'react-native';
import NotificationHandlerInstance from './src/app-resources/notificationHanler';
import {BACKGROUND_COLOR} from './src/components/CONSTS';
import AppStack from './src/routing/BasicRouting';

AppRegistry.registerHeadlessTask('SmsTransfer', () =>
  require('./src/Sms_Handler'),
);

const root_style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});

const App = () => {
  useEffect(() => {
    NotificationHandlerInstance.setForegroundMessageHanled();
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaView style={root_style.root}>
        <AppStack />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
