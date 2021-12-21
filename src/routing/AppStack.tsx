import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TDrawerNavigation, TRootNavigation} from './types';
import BalanceOverviewTabs from '../pages/overview/TabOverview';
import AccountSettings from '../pages/account-settings/AccountSettings';
import AppConfigurationRoutes from './ConfigurationStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {PRIMARY_BACKGRORUND_COLOR} from '../components/CONSTS';
import {useWindowDimensions} from 'react-native';

const Stack = createNativeStackNavigator<TRootNavigation>(); //app stack so back button exits the app if the user is logged in

const OptionsDrawerNavigation = createDrawerNavigator<TDrawerNavigation>(); //drawer navigation and appstack navigation are both here, because they together are forming the application navigation tree

export const AppDrawer: React.FC<{}> = (): JSX.Element => {
  const dimension = useWindowDimensions();
  return (
    <>
      <OptionsDrawerNavigation.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: PRIMARY_BACKGRORUND_COLOR,
          drawerStyle: {
            width: Math.floor(dimension.width / 2),
            backgroundColor: PRIMARY_BACKGRORUND_COLOR,
          },
          drawerItemStyle: {
            marginLeft: 0,
          },
        }}
        initialRouteName="App">
        <OptionsDrawerNavigation.Screen name="App" component={AppStack} />
      </OptionsDrawerNavigation.Navigator>
    </>
  );
};

const AppStack: React.FC<{}> = (): JSX.Element => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={BalanceOverviewTabs} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
        <Stack.Screen name="Configuration" component={AppConfigurationRoutes} />
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
