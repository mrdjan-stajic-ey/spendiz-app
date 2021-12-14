import React from 'react';
import {Animated, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import useAnimatedBackground from '../../hooks/useAnimatedBackground';
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

const PillButton: React.FC<PillAppButton> = ({
  text,
  onSelect,
  selected,
  data,
  disabled,
  isMarked = false,
}): JSX.Element => {
  const onPressHandler = () => {
    !disabled && onSelect && onSelect(data || text);
  };
  const [getStyles] = useAnimatedBackground(isMarked ? 'FORWARD' : 'BACKWARD');
  const animatedStyle = {
    borderWidth: selected ? 0 : styles.content.borderWidth,
    backgroundColor: selected
      ? styles.content.backgroundColor
      : getStyles({
          inputRange: [0, 1],
          outputRange: ['transparent', 'rgb(224,82,99)'],
        }),
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={onPressHandler}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <AppText
          text={text}
          style={[styles.text]}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default PillButton;
