import {CompositeNavigationProp} from '@react-navigation/core';
import {NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IAppUser} from '../data-management/type';
import {ISmsState} from '../native-wrappers/types';

//ROUTER Exports for type checking
export interface BalanceOverviewRouteProps {
  type: string;
}

export interface SplashScreenRouteProps {
  loading: boolean;
  userData: IAppUser;
}

export type T_Auth_Stack = {
  Splash: SplashScreenRouteProps;
  App: undefined;
  Login: undefined;
  Register: undefined;
};

export type TRootNavigation = {
  Home: NavigatorScreenParams<TTabOverviewLayout>;
  Login: undefined;
  Expenses: undefined;
  BalanceOverview: BalanceOverviewRouteProps | undefined;
  AccountSettings: undefined;
  Splash: SplashScreenRouteProps;
  Configuration: NavigatorScreenParams<TConfigurationNavigation>;
};

export type TConfigurationNavigation = {
  Parser: ISmsState;
  Phrase: undefined;
  Overview: undefined;
};

export type TTabOverviewLayout = {
  PredictionChart: undefined;
  ExpansesOverview: undefined;
};

export type TTabNavigator = StackNavigationProp<
  //I really dont know what i am doing here // https://stackoverflow.com/questions/61389095/react-navigation-v5-how-to-navigate-between-tabs-with-typescript
  TRootNavigation,
  'AccountSettings'
>;

export type PrimaryNavigator = StackNavigationProp<TRootNavigation, 'Home'>;
export type PrimaryNavigatorParent = CompositeNavigationProp<
  TTabNavigator,
  PrimaryNavigator
>;

//END Router Exports for type checking
