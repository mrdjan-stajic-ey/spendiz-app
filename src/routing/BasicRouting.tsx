import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
import Home from '../pages/Home';
import Parser from '../pages/message/MessageParser';
import {BACKGROUND_COLOR, DEFAULT_TEXT_COLOR} from '../components/CONSTS';

export type TRootNavigation = {
  Home: undefined;
  Login: undefined;
  Parser: undefined;
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
          headerStyle: {
            backgroundColor: BACKGROUND_COLOR,
          },
          headerTitleAlign: 'center',
          headerTintColor: DEFAULT_TEXT_COLOR,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Parser" component={Parser} />
      </Stack.Navigator>
    </>
  );
};
export default AppStack;
