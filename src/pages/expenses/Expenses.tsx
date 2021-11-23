import React from 'react';
import {StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppChart from '../../components/chart/AppChart';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import Expense from '../../components/expense/ExpenseItem';
import {Divider} from 'native-base';
import {MOCK_EXPENSE_TYPES} from './_mock';
import {IExpenseProps} from './types';
import AppScrollView from '../../components/scrollview/AppScrollView';

const styles = StyleSheet.create({
  chartContent: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 10,
  },
  categoryContent: {
    flex: 1,
    flexDirection: 'row',
  },
});
const Expenses: React.FC<IExpenseProps> = ({navigation}): JSX.Element => {
  const onExpenseTypeHandlerClick = (type: string) => {
    navigation.navigate('BalanceOverview', {type});
  };
  return (
    <AppPage>
      <View style={styles.chartContent}>
        <AppText
          style={styles.subtitle}
          type="SUBTITLE"
          text={getTextByLocale().expenseChartHeading}
        />
        <AppChart />
      </View>
      <AppText type="SUBTITLE" text={getTextByLocale().categoriesSubtitle} />
      <AppScrollView horizontal={true} style={styles.categoryContent}>
        {MOCK_EXPENSE_TYPES.map(({amount, displayName, icon, type}, index) => {
          //TODO :there will be and ID here (be creation)
          return (
            <React.Fragment key={'expanse' + type + amount + index}>
              <Expense
                navigationHandler={() => {
                  onExpenseTypeHandlerClick(type);
                }}
                key={'expanse' + type + amount + index}
                amount={amount}
                displayName={displayName}
                icon={icon}
                type={type}
              />
              {index !== MOCK_EXPENSE_TYPES.length - 1 && (
                <Divider
                  orientation="vertical"
                  key={'divider' + type + amount}
                />
              )}
            </React.Fragment>
          );
        })}
      </AppScrollView>
    </AppPage>
  );
};

export default Expenses;
