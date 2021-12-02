import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Center} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HttpReq from '../../http/axios-wrapper';
import {TTabOverviewLayout} from '../../routing/types';
import AppList from '../List/AppList';
import {AppLoader} from '../loading/loader';
import AppPage from '../page/AppPage';
import AppText from '../Text/AppText';
import {ExpenseListItem} from './ExpenseItem';
import {IExpenseListItem} from './types';
const styles = StyleSheet.create({
  listHolder: {
    flex: 2,
  },
});

type T_Nav_Tab_Props = NativeStackScreenProps<
  TTabOverviewLayout,
  'ExpansesOverview'
>;

const ExpensesListPreview: React.FC<T_Nav_Tab_Props> = ({
  navigation,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IExpenseListItem[] | null>(null);

  useEffect(() => {
    const blurSubscriber = navigation.addListener('blur', () => {
      setIsLoading(true);
      setData(null);
    });
    const focusSubscriber = navigation.addListener('focus', () => {
      fetchExpenses();
    });
    return () => {
      focusSubscriber;
      blurSubscriber;
    };
  }, [navigation]);

  const fetchExpenses = async () => {
    return (
      HttpReq.get<IExpenseListItem[]>('/balance-action/user')
        // eslint-disable-next-line no-shadow
        .then(data => {
          if (data) {
            setData(data);
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.log('Failed expense fetch', err);
        })
    );
  };
  useEffect(() => {
    setTimeout(() => {
      fetchExpenses();
    }, 200);
  }, []);

  const keyExtractor = (item: IExpenseListItem) => item.id;
  const renderItem = (item: IExpenseListItem) => {
    return (
      <ExpenseListItem
        amount={item.amount}
        expenseType={item.expenseType}
        id={item.id}
        phrasesInfluence={item.phrasesInfluence}
        key={item.id}
      />
    );
  };
  return (
    <AppPage>
      <Center mb={5}>
        <AppText type="SUBTITLE" text="Your most recent transactions" />
      </Center>
      <View style={styles.listHolder}>
        {isLoading && <AppLoader />}
        {!isLoading && data.length > 0 && (
          <AppList
            data={data || []}
            renderItem={({item}) => {
              return renderItem(item);
            }}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
    </AppPage>
  );
};

export default ExpensesListPreview;
