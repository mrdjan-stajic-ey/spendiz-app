import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BUTTON_PRIMARY} from '../CONSTS';
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
    width: windowWidth / 4 - 25, //paddingz
    height: 35,
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: 'black', //TODO fonts generaly
  },
});

const SELECTED_PILL_COLOR = '#7f03fc';
const NOT_SELECTED_PILL_COLOR = '#a30029';

const PillButton: React.FC<PillAppButton> = ({
  text,
  onSelect,
  selected,
  data,
}): JSX.Element => {
  const onPressHandler = () => {
    onSelect(data || text);
  };
  return (
    <TouchableOpacity onPress={onPressHandler} style={[styles.content]}>
      <View>
        <AppText
          text={text}
          style={[
            styles.text,
            {color: selected ? SELECTED_PILL_COLOR : NOT_SELECTED_PILL_COLOR},
          ]}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PillButton;
