import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {T_Auth_Stack} from './types';
import UserContext from '../data-management/user/UserContext';
import SplashScreen from '../pages/SplashScreen';
import Login from '../pages/Login';
import RegisterPage from '../pages/Register';
import {AppDrawer} from './AppStack';

export const AuthStackNavigator = createStackNavigator<T_Auth_Stack>(); //auth stack

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
        <AuthStackNavigator.Screen name="App" component={AppDrawer} />
      )}
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack;
