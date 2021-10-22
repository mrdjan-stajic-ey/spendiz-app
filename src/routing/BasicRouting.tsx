import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
// import Home from '../pages/Home';
import Expenses from '../pages/expenses/Expenses';
import BalanceOverview from '../pages/overview/BalanceOverview';
import {DEFAULT_TEXT_COLOR} from '../components/CONSTS';
import {TRootNavigation} from './types';
import AccountSettings from '../pages/account-settings/AccountSettings';
import MessageParser from '../components/message/MessageDataParser';

const Stack = createNativeStackNavigator<TRootNavigation>();

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
        <Stack.Screen name="Parser" component={MessageParser} />
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
      </Stack.Navigator>
    </>
  );
};
export default AppStack;
