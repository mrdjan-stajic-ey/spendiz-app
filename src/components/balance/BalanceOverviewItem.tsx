import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import AppText from '../Text/AppText';
import {IBalanceOverviewItem} from './type';

const style = StyleSheet.create({
  holder: {
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
  },
  image: {
    width: 75,
    height: 75,
  },
});

const BalanceModuleItem: React.FC<IBalanceOverviewItem> = ({
  src,
  name,
  onPress,
}): JSX.Element => {
  return (
    <TouchableOpacity style={style.holder} onPress={onPress}>
      <AppText text={name || 'Default name'} style={style.text} />
      <Image style={style.image} source={src} />
    </TouchableOpacity>
  );
};

export default BalanceModuleItem;
