import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AppIcon from '../Icon/AppIcon';
import AppText from '../Text/AppText';
import getMoney, {Currency} from '../../app-resources/Currency';
import {getIconByType, IExpenseType} from './types';

const style = StyleSheet.create({
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  item_part: {
    marginBottom: 5,
  },
});
console.warn('TODO://check comments bellow EXPENSE ITEM');
// Expense TYPE by category! needs icons and sumed up category stuff
// maybe replace the icons with .transparent pngs in the app-resources/pictures
const Expense: React.FC<IExpenseType> = ({
  amount,
  type,
  displayName,
  navigationHandler,
}): JSX.Element => {
  const _displayName = displayName
    ? displayName.replace(/(^\w{1})|(\s{1}\w{1})/g, match =>
        match.toUpperCase(),
      )
    : type
        .toString()
        .replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  return (
    <View style={style.content}>
      <TouchableOpacity onPress={navigationHandler}>
        <View style={style.item}>
          <AppIcon size={25} icon={getIconByType(type)} />
          <AppText style={style.item_part} text={_displayName || type} />
          <AppText
            style={style.item_part}
            text={`${getMoney(amount, Currency.RSD)}`}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Expense;
