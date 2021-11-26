import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import HttpReq, {LOG_ERROR, REQUEST_ERRORS} from '../../http/axios-wrapper';
import AppList from '../List/AppList';
import {AppLoader} from '../loading/loader';
import AppText from '../Text/AppText';

interface IExpenseListPreview {}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

interface IExpenseType {
  name: string;
  description: string;
}

interface IExpenseListItem {
  id: string;
  phrasesInfluence: string;
  amount: string;
  expansesType: IExpenseType[];
}

const formatMoney = (amount: number) => {
  return amount.toLocaleString('en-US', {style: 'currency', currency: 'RSD'});
};

const ExpensesListPreview: React.FC<{}> = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IExpenseListItem[] | null>(null);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // eslint-disable-next-line no-shadow
        HttpReq.get<IExpenseListItem[]>('/balance-action/user').then(data => {
          console.log(data);
          if (data) {
            setData(
              data.map(di => {
                return {
                  ...di,
                  amount: formatMoney(parseInt(di.amount)),
                };
              }),
            );
          }
          setIsLoading(false);
        });
      } catch (error) {
        Alert.alert('Something went wrong');
        LOG_ERROR(REQUEST_ERRORS.GET_FAILED, {error});
      }
    };
    fetchExpenses();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyExtractor = () => {};
  const renderItem = (item: IExpenseListItem) => {
    return (
      <View key={item.id} style={{display: 'flex', flexDirection: 'row'}}>
        <AppText text={item.phrasesInfluence} />
        <AppText text={item.amount} />
      </View>
    );
  };
  return (
    <View style={styles.content}>
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
  );
};

export default ExpensesListPreview;
