import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
import Expenses from '../pages/expenses/Expenses';
import BalanceOverview from '../pages/overview/BalanceOverview';
import {DEFAULT_TEXT_COLOR} from '../components/CONSTS';
import {TConfigurationNavigation, TRootNavigation} from './types';
import AccountSettings from '../pages/account-settings/AccountSettings';
import MessageParser from '../components/message/MessageDataParser';
import {createStackNavigator} from '@react-navigation/stack';
import PhraseConfiguration from '../pages/account-settings/PhraseConfiguration';

const Stack = createNativeStackNavigator<TRootNavigation>();

const ConfigurationStack = createStackNavigator<TConfigurationNavigation>();

const AppConfigurationRoutes = () => {
  return (
    <ConfigurationStack.Navigator initialRouteName="Parser">
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
          headerTitleAlign: 'center',
          headerTintColor: DEFAULT_TEXT_COLOR,
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={BalanceOverview}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Expenses"
          options={{
            title: 'Breakdown',
            headerShown: false,
          }}
          component={Expenses}
        />
        <Stack.Screen name="BalanceOverview" component={BalanceOverview} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
        <Stack.Screen name="Configuration" component={AppConfigurationRoutes} />
      </Stack.Navigator>
    </>
  );
};
export default AppStack;
