import {useNavigation} from '@react-navigation/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Box, Center} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import BalanceModuleItem from '../../components/balance/BalanceOverviewItem';
import AppDivider from '../../components/divider/AppDivider';
import ExpensesListPreview from '../../components/expense/ExpansesPreview';
import {ExpensesSummed} from '../../components/expense/sum/ExpanseLineBar';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import {TTabNavigator, TTabOverviewLayout} from '../../routing/types';

import {MODULES_INFO} from './data';
import {MODULE_TYPES, T_Tab_Layout} from './type';

const styles = StyleSheet.create({
  scrollContent: {
    margin: 10,
    flexDirection: 'row',
  },
  balanceOverviewTotals: {
    marginTop: 5,
    flexDirection: 'row',
  },
  currentTabContent: {
    flex: 1,
  },
  balanceBoxMyBalance: {
    flexDirection: 'row',
  },
  balanceMessage: {
    marginLeft: 150,
  },
  overviewSpent: {
    marginRight: 50,
  },
  moduleStyle: {
    flex: 1,
    marginTop: 10,
  },
  expenseModuleChartHolder: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
const OverviewTabsNavigation =
  createMaterialTopTabNavigator<TTabOverviewLayout>();

export const TAB_SCREENS = {
  PREDICTION: 'PREDICTION',
  EXPENSEOVERVIEW: 'EXPENSE_OVERVIEW',
};

const BalanceOverviewTabs: React.FC<T_Tab_Layout> = ({
  navigation,
}): JSX.Element => {
  const _navigation = useNavigation<TTabNavigator>();

  const onModulePressHandler = (_type: MODULE_TYPES) => {
    switch (_type) {
      case MODULE_TYPES.BALANCE: {
        navigation.navigate('ExpansesOverview');
        break;
      }
      case MODULE_TYPES.EXPENESE: {
        navigation.navigate('PredictionChart');
        break;
      }
      case MODULE_TYPES.SETTINGS: {
        _navigation.navigate('AccountSettings');
        break;
      }
      default:
        break;
    }
  };
  return (
    <AppPage>
      <Center>
        <AppText type="TITLE" text={getTextByLocale().balanceOverview} />
        <AppDivider />
      </Center>
      <View style={styles.scrollContent}>
        <Center flex={1} flexDirection={'row'}>
          {MODULES_INFO.map(({src, name, type}, index) => {
            return (
              <BalanceModuleItem
                onPress={() => {
                  onModulePressHandler(type);
                }}
                name={name}
                key={index}
                src={src}
              />
            );
          })}
        </Center>
      </View>
      <Box flex={1}>
        <AppDivider />
        <OverviewTabsNavigation.Navigator
          tabBar={() => null}
          initialRouteName={'ExpansesOverview'}
          defaultScreenOptions={{lazy: true}}>
          <OverviewTabsNavigation.Screen
            name="PredictionChart"
            component={ExpensesSummed}
          />
          <OverviewTabsNavigation.Screen
            name="ExpansesOverview"
            component={ExpensesListPreview}
          />
        </OverviewTabsNavigation.Navigator>
      </Box>
    </AppPage>
  );
};

export default BalanceOverviewTabs;
