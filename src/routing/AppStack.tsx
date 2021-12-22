import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TDrawerNavigation, TRootNavigation} from './types';
import BalanceOverviewTabs from '../pages/overview/TabOverview';
import AccountSettings from '../pages/account-settings/AccountSettings';
import AppConfigurationRoutes from './ConfigurationStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {PRIMARY_BACKGROUND_COLOR} from '../components/CONSTS';
import {useWindowDimensions} from 'react-native';
import UserContext from '../data-management/user/UserContext';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator<TRootNavigation>(); //app stack so back button exits the app if the user is logged in

const OptionsDrawerNavigation = createDrawerNavigator<TDrawerNavigation>(); //drawer navigation and appstack navigation are both here, because they together are forming the application navigation tree

export const ApplicationRouter: React.FC<{}> = (): JSX.Element => {
  const {userData} = useContext(UserContext);
  return (
    <>
      {userData?.user && <AppDrawer />}
      {!userData?.user && <AuthStack />}
    </>
  );
};

export const AppDrawer: React.FC<{}> = (): JSX.Element => {
  const dimension = useWindowDimensions();
  return (
    <>
      <OptionsDrawerNavigation.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: PRIMARY_BACKGROUND_COLOR,
          drawerStyle: {
            width: Math.floor(dimension.width / 2),
            backgroundColor: PRIMARY_BACKGROUND_COLOR,
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
  // main stack that is wrapped into a drawer, it will display this stack first always
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
