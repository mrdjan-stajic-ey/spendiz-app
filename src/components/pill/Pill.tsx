import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BUTTON_PRIMARY, THIRD_BACKGROUND_COLOR} from '../CONSTS';
import AppText from '../Text/AppText';
import {PillAppButton} from './types';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: BUTTON_PRIMARY,
    marginRight: 10,
    width: windowWidth / 4, //paddingz and borderWidth
    height: 40,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderColor: THIRD_BACKGROUND_COLOR,
    borderWidth: 2,
  },
  text: {
    fontSize: 12,
    color: 'white', //TODO fonts generaly
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SELECTED_PILL_COLOR = '#7f03fc';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NOT_SELECTED_PILL_COLOR = '#a30029';

const PillButton: React.FC<PillAppButton> = ({
  text,
  onSelect,
  selected,
  data,
  disabled,
}): JSX.Element => {
  const onPressHandler = () => {
    !disabled && onSelect && onSelect(data || text);
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPressHandler}
      style={[
        styles.content,
        //need inline styles here dynamic stuff
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: selected
            ? styles.content.backgroundColor
            : 'transparent',
          borderWidth: selected ? 0 : styles.content.borderWidth,
        },
      ]}>
      <View>
        <AppText
          text={text}
          style={[styles.text]}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PillButton;
