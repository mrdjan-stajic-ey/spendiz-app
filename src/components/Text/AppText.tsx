import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {DEFAULT_TEXT_COLOR, DEFAULT_TEXT_SIZE} from '../CONSTS';
import {getTextStyleByType, IAppText} from './type';

const styles = StyleSheet.create({
  text: {
    color: DEFAULT_TEXT_COLOR,
    fontSize: DEFAULT_TEXT_SIZE,
    fontFamily: 'Poppins-Light',
  },
});

const AppText: React.FC<IAppText> = ({
  text,
  type,
  style,
  numberOfLines,
  ellipsizeMode,
}): JSX.Element => {
  const font_size = useMemo(() => {
    return getTextStyleByType(type);
  }, [type]);
  return (
    <Text
      style={[styles.text, {fontSize: font_size}, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {text}
    </Text>
  );
};

export default React.memo(AppText);
