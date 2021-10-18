import React from 'react';
import {IconDefinition, IconProp} from '@fortawesome/fontawesome-svg-core';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AppIcon from '../Icon/AppIcon';
import AppText from '../Text/AppText';
import getMoney, {Currency} from '../../app-resources/Currency';
import {
  faCoffee,
  faMusic,
  faPlaneSlash,
} from '@fortawesome/free-solid-svg-icons';
import {T_IconType} from '../CONSTS';

interface IExpenseType {
  type: string;
  amount: number;
  icon?: IconProp;
  displayName?: string;
}

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

interface I_ExpenesIconType {
  key: T_IconType;
  icon: IconDefinition;
}

const DEFAULT_ICON_MAPPING_TYPE: I_ExpenesIconType[] = [
  {
    key: 'FOOD',
    icon: faCoffee,
  },
  {
    key: 'ENTERTAINMENT',
    icon: faMusic,
  },
  {
    key: 'TRAVEL',
    icon: faPlaneSlash,
  },
];

const getIconByType = (type: string): IconDefinition => {
  const result = DEFAULT_ICON_MAPPING_TYPE.find(
    k => k.key.toString() === type,
  )?.icon;
  return result || faCoffee;
};

const Expense: React.FC<IExpenseType> = ({
  amount,
  type,
  displayName,
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
      <TouchableOpacity>
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
