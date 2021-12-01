import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import HttpReq, {LOG_ERROR, REQUEST_ERRORS} from '../../http/axios-wrapper';
import AppList from '../List/AppList';
import {AppLoader} from '../loading/loader';
import AppPage from '../page/AppPage';
import {ExpenseListItem} from './ExpenseItem';
import {IExpenseListItem} from './types';
const styles = StyleSheet.create({
  listHolder: {
    flex: 2,
  },
});

const ExpensesListPreview: React.FC<{}> = ({}): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IExpenseListItem[] | null>(null);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // eslint-disable-next-line no-shadow
        return HttpReq.get<IExpenseListItem[]>('/balance-action/user').then(
          data => {
            if (data) {
              setData(data);
              setIsLoading(false);
            }
          },
        );
      } catch (error) {
        Alert.alert('Something went wrong');
        LOG_ERROR(REQUEST_ERRORS.GET_FAILED, {error});
      }
    };
    fetchExpenses();
  }, []);

  const keyExtractor = (item: IExpenseListItem) => item.id;
  const renderItem = (item: IExpenseListItem) => {
    return (
      <ExpenseListItem
        amount={item.amount}
        expenseTypes={item.expenseTypes}
        id={item.id}
        phrasesInfluence={item.phrasesInfluence}
        key={item.id}
      />
    );
  };
  return (
    <AppPage>
      <View style={styles.listHolder}>
        {isLoading && <AppLoader />}
        {!isLoading && (
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
