import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
import Expenses from '../pages/expenses/Expenses';
import BalanceOverview from '../pages/overview/BalanceOverview';
import {TConfigurationNavigation, TRootNavigation} from './types';
import AccountSettings from '../pages/account-settings/AccountSettings';
import MessageParser from '../components/message/MessageDataParser';
import {createStackNavigator} from '@react-navigation/stack';
import PhraseConfiguration from '../pages/account-settings/PhraseConfiguration';

const Stack = createNativeStackNavigator<TRootNavigation>();

const ConfigurationStack = createStackNavigator<TConfigurationNavigation>();

const AppConfigurationRoutes = () => {
  return (
    <ConfigurationStack.Navigator
      initialRouteName="Parser"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <ConfigurationStack.Screen name="Parser" component={MessageParser} />
      <ConfigurationStack.Screen
        name="Phrase"
        component={PhraseConfiguration}
      />
    </ConfigurationStack.Navigator>
  );
};

const AppStack: React.FC<{}> = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BalanceOverview} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="BalanceOverview" component={BalanceOverview} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
        <Stack.Screen name="Configuration" component={AppConfigurationRoutes} />
      </Stack.Navigator>
    </>
  );
};
export default AppStack;
