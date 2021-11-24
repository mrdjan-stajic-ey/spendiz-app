import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {BUTTON_PRIMARY, DEFAULT_TEXT_COLOR, DEFAULT_TEXT_SIZE} from '../CONSTS';
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
  link,
  color,
}): JSX.Element => {
  const font_size = useMemo(() => {
    return getTextStyleByType(type);
  }, [type]);

  const getTextColor = () => {
    if (link) {
      //if the button is link type it will override the color props if present
      return BUTTON_PRIMARY;
    } else {
      if (color) {
        return color;
      }
    }
    return `${link ? BUTTON_PRIMARY : styles.text.color}`;
  };

  return (
    <Text
      style={[
        styles.text,
        {fontSize: font_size},
        {color: getTextColor()},
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {text}
    </Text>
  );
};

export default React.memo(AppText);
