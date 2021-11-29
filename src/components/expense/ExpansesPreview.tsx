import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Box} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HttpReq, {LOG_ERROR, REQUEST_ERRORS} from '../../http/axios-wrapper';
import {BACKGROUND_ITEM_DEFAULT} from '../CONSTS';
import AppIcon from '../Icon/AppIcon';
import AppList from '../List/AppList';
import {AppLoader} from '../loading/loader';
import AppText from '../Text/AppText';
import {IExpenseListItem} from './types';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  expenseItemHolder: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: BACKGROUND_ITEM_DEFAULT,
    marginBottom: 5,
  },
  expanseListItem: {
    flex: 1,
    marginRight: 10,
  },
  expenseCategories: {
    flex: 1,
    flexDirection: 'row',
  },
  expenseIconItem: {
    flex: 1,
  },
});

const formatMoney = (amount: number) => {
  console.log(amount);
  return amount.toLocaleString('en-US', {style: 'currency', currency: 'RSD'});
};

const ICON_COLOR_INBOUND = '#426e40';
const ICON_COLOR_OUTBOUND = '#742525';

const ExpensesListPreview: React.FC<{}> = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IExpenseListItem[] | null>(null);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // eslint-disable-next-line no-shadow
        HttpReq.get<IExpenseListItem[]>('/balance-action/user').then(data => {
          if (data) {
            setData([
              ...data.map(di => {
                return {
                  ...di,
                  amount: formatMoney(
                    parseInt(di.amount.replace(',', '').trim(), 10), //TODO: not not not not here
                  ),
                };
              }),
            ]);
          }
          setIsLoading(false);
        });
      } catch (error) {
        Alert.alert('Something went wrong');
        LOG_ERROR(REQUEST_ERRORS.GET_FAILED, {error});
      }
    };
    fetchExpenses();
  }, []);

  const keyExtractor = () => {};
  const renderItem = (item: IExpenseListItem) => {
    return (
      <TouchableOpacity key={item.id}>
        <Box padding={5} style={styles.expenseItemHolder}>
          <AppText
            type="LABEL"
            style={styles.expanseListItem}
            text={item.amount}
          />
          <View style={styles.expenseCategories}>
            {item.expenseTypes.map(et => {
              return <AppText key={et.id} text={et.name} />;
            })}
          </View>
          <AppIcon
            style={styles.expenseIconItem}
            color={
              item.phrasesInfluence === 'INBOUND'
                ? ICON_COLOR_INBOUND
                : ICON_COLOR_OUTBOUND
            }
            icon={
              item.phrasesInfluence === 'INBOUND'
                ? faChevronLeft
                : faChevronRight
            }
          />
        </Box>
      </TouchableOpacity>
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
