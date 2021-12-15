import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Box} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BACKGROUND_ITEM_DEFAULT} from '../CONSTS';
import AppIcon from '../Icon/AppIcon';
import AppText from '../Text/AppText';
import {IExpenseListItem} from './types';

const styles = StyleSheet.create({
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
    flexDirection: 'row',
  },
  expenseCategory: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  expenseIconItem: {
    flex: 1,
  },
});

const ICON_COLOR_INBOUND = '#426e40';
const ICON_COLOR_OUTBOUND = '#742525';

export const ExpenseListItem: React.FC<IExpenseListItem> = ({
  amount,
  expenseType,
  id,
  phrasesInfluence,
}): JSX.Element => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('PredictionChart', null);
        }}
        key={id}>
        <Box borderRadius={5} padding={5} style={styles.expenseItemHolder}>
          <AppText
            type="LABEL"
            style={styles.expanseListItem}
            text={amount + ''}
          />
          <View style={styles.expenseCategories}>
            <View style={styles.expenseCategory}>
              <AppText text={expenseType.name} />
            </View>
          </View>
          <AppIcon
            style={styles.expenseIconItem}
            color={
              phrasesInfluence === 'INBOUND'
                ? ICON_COLOR_INBOUND
                : ICON_COLOR_OUTBOUND
            }
            icon={
              phrasesInfluence === 'INBOUND' ? faChevronLeft : faChevronRight
            }
          />
        </Box>
      </TouchableOpacity>
    </>
  );
};
