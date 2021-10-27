import {NavigatorScreenParams} from '@react-navigation/core';
import {ISmsState} from '../native-wrappers/types';

//ROUTER Exports for type checking
export interface BalanceOverviewRouteProps {
  type: string;
}
//END Router Exports for type checking
export type TRootNavigation = {
  Home: undefined;
  Login: undefined;
  Expenses: undefined;
  BalanceOverview: BalanceOverviewRouteProps | undefined;
  AccountSettings: undefined;
  Configuration: NavigatorScreenParams<TConfigurationNavigation>;
};

export type TConfigurationNavigation = {
  Parser: ISmsState;
  Phrase: undefined;
  Overview: undefined;
};
