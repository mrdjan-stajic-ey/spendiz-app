import {ISmsState} from '../native-wrappers/types';

//ROUTER Exports for type checking
export interface BalanceOverviewRouteProps {
  type: string;
}
//END Router Exports for type checking
export type TRootNavigation = {
  Home: undefined;
  Login: undefined;
  Parser: ISmsState;
  Expenses: undefined;
  BalanceOverview: BalanceOverviewRouteProps | undefined;
  AccountSettings: undefined;
};
