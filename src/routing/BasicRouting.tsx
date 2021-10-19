import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
import Home from '../pages/Home';
import Parser from '../pages/message/MessageParser';
import Expenses from '../pages/expenses/Expenses';
import BalanceOverview from '../pages/overview/BalanceOverview';
import {DEFAULT_TEXT_COLOR} from '../components/CONSTS';
//ROUTER Exports for type checking
export interface BalanceOverviewRouteProps {
  type: string;
}
//END Router Exports for type checking
export type TRootNavigation = {
  Home: undefined;
  Login: undefined;
  Parser: undefined;
  Expenses: undefined;
  BalanceOverview: BalanceOverviewRouteProps | undefined;
};

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
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Parser" component={Parser} />
        <Stack.Screen
          name="Expenses"
          options={{
            title: 'Breakdown',
            headerShown: false,
          }}
          component={Expenses}
        />
        <Stack.Screen name="BalanceOverview" component={BalanceOverview} />
      </Stack.Navigator>
    </>
  );
};
export default AppStack;
