import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TRootNavigation} from './types';
import BalanceOverviewTabs from '../pages/overview/TabOverview';
import AccountSettings from '../pages/account-settings/AccountSettings';
import AppConfigurationRoutes from './ConfigurationStack';
const Stack = createNativeStackNavigator<TRootNavigation>(); //app stack so back button exits the app if the user is logged in

const AppStack: React.FC<{}> = (): JSX.Element => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          //   animation: 'none',
        }}>
        <Stack.Screen name="Home" component={BalanceOverviewTabs} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
        <Stack.Screen name="Configuration" component={AppConfigurationRoutes} />
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
