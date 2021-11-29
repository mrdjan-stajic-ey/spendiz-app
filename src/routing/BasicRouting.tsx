import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
import BalanceOverview from '../pages/overview/BalanceOverview';
import {TConfigurationNavigation, TRootNavigation, T_Auth_Stack} from './types';
import AccountSettings from '../pages/account-settings/AccountSettings';
import MessageParser from '../pages/account-settings/MessageDataParser';
import {createStackNavigator} from '@react-navigation/stack';
import PhraseConfiguration from '../pages/account-settings/PhraseConfiguration';
import PhraseWizard from '../data-management/PhraseWizard';
import OverviewPage from '../pages/account-settings/Overview';
import RegisterPage from '../pages/Register';
import UserContext from '../data-management/user/UserContext';

const AuthStackNavigator = createStackNavigator<T_Auth_Stack>(); //auth stack
const Stack = createNativeStackNavigator<TRootNavigation>(); //app stack so back button exits the app if the user is logged in
const ConfigurationStack = createStackNavigator<TConfigurationNavigation>();

const AppConfigurationRoutes = () => {
  return (
    <PhraseWizard>
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
        <ConfigurationStack.Screen name="Overview" component={OverviewPage} />
      </ConfigurationStack.Navigator>
    </PhraseWizard>
  );
};

const AppStack: React.FC<{}> = (): JSX.Element => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
        <Stack.Screen name="Home" component={BalanceOverview} />
        <Stack.Screen name="BalanceOverview" component={BalanceOverview} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
        <Stack.Screen name="Configuration" component={AppConfigurationRoutes} />
      </Stack.Navigator>
    </>
  );
};

const AuthStack: React.FC<{}> = (): JSX.Element => {
  const {userData} = useContext(UserContext);
  return (
    <AuthStackNavigator.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      {!userData?.user && (
        <>
          <AuthStackNavigator.Screen name="Splash" component={SplashScreen} />
          <AuthStackNavigator.Screen name="Login" component={Login} />
          <AuthStackNavigator.Screen name="Register" component={RegisterPage} />
        </>
      )}

      {userData?.user && (
        <AuthStackNavigator.Screen name="App" component={AppStack} />
      )}
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack;
