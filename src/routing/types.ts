import {NavigatorScreenParams} from '@react-navigation/core';
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

//END Router Exports for type checking
