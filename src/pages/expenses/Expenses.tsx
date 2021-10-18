import React from 'react';
import {StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppChart from '../../components/chart/AppChart';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import Expense from '../../components/expense/ExpenseItem';
import {faAirbnb, faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {Divider, IScrollViewProps, ScrollView} from 'native-base';

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

//TODO: this must be moved from here as it creates dependencies to font awesome;
const MOCK_EXPENSE_TYPES = [
  {
    amount: 200,
    icon: faFacebook,
    type: 'FOOD',
    displayName: 'Giros',
  },
  {
    amount: 150,
    icon: faAirbnb,
    type: 'TRAVEL',
    displayName: 'Grcka',
  },
  {
    amount: 200,
    icon: faFilm,
    type: 'ENTERTAINMENT',
    displayName: 'Movies',
  },
  {
    amount: 256.63,
    icon: faFilm,
    type: 'ENTERTAINMENT',
    displayName: 'Type#23',
  },
  {
    amount: 256.63,
    icon: faFilm,
    type: 'ENTERTAINMENT',
    displayName: 'Type#32',
  },
  {
    amount: 256.63,
    icon: faFilm,
    type: 'ENTERTAINMENT',
    displayName: 'Type#32',
  },
  {
    amount: 256.63,
    icon: faFilm,
    type: 'ENTERTAINMENT',
    displayName: 'Type#32',
  },
  {
    amount: 256.63,
    icon: faFilm,
    type: 'ENTERTAINMENT',
    displayName: 'Type#32',
  },
  {
    amount: 256.63,
    icon: faFilm,
    type: 'ENTERTAINMENT',
    displayName: 'Type#32',
  },
];
//TODO: make a scrollview component;
const DEFAULT_SCROLLVIEW_STYLES: IScrollViewProps = {
  mb: '4',
  minW: '72',
  flexDirection: 'row',
  flexGrow: 1,
};

const Expenses: React.FC<{}> = ({}): JSX.Element => {
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
      <ScrollView
        horizontal={true}
        _contentContainerStyle={DEFAULT_SCROLLVIEW_STYLES}
        style={styles.categoryContent}>
        {MOCK_EXPENSE_TYPES.map(({amount, displayName, icon, type}, index) => {
          return (
            <>
              <Expense
                key={type + amount}
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
            </>
          );
        })}
      </ScrollView>
    </AppPage>
  );
};

export default Expenses;
