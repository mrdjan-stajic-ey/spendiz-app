//ROUTER Exports for type checking
export interface BalanceOverviewRouteProps {
  type: string;
}
//END Router Exports for type checking
export type TRootNavigation = {
  Home: undefined;
  Login: undefined;
  Parser: undefined;
  Expenses: undefined;
  BalanceOverview: BalanceOverviewRouteProps | undefined;
  AccountSettings: undefined;
};
