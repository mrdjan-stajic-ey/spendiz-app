import React, {useRef} from 'react';
import {Dimensions, StyleSheet, View, Animated} from 'react-native';
import {Button} from 'native-base';
import {} from 'react-native-gesture-handler';
import {BUTTON_PRIMARY} from '../CONSTS';
import {IPillButton} from './type';

const windowWidth = Dimensions.get('window').width;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(Button);

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
  },
});
const PillButton: React.FC<IPillButton> = ({text}): JSX.Element => {
  const pillScale = useRef(new Animated.Value(1)).current;
  const pillOpacity = useRef(new Animated.Value(1)).current;

  const handlePillOnPress = () => {
    // Animated.parallel([
    //   Animated.timing(pillScale, {
    //     toValue: 1.5,
    //     duration: 300,
    //     useNativeDriver: false,
    //   }),
    //   Animated.timing(pillOpacity, {
    //     toValue: 0.8,
    //     duration: 100,
    //     useNativeDriver: false,
    //   }),
    // ]).start();
  };

  const handlePillOnPressOut = () => {
    // Animated.parallel([
    //   Animated.timing(pillScale, {
    //     toValue: 1,
    //     duration: 100,
    //     useNativeDriver: false,
    //   }),
    //   Animated.timing(pillOpacity, {
    //     toValue: 1,
    //     duration: 100,
    //     useNativeDriver: false,
    //   }),
    // ]).start();
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.content,
        {
          backgroundColor: BUTTON_PRIMARY,
          transform: [{scale: pillScale}],
          opacity: pillOpacity,
        },
      ]}
      onPressOut={handlePillOnPressOut}
      onPressIn={handlePillOnPress}>
      <View>
        <Animated.Text
          style={[styles.text]}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {text}
        </Animated.Text>
      </View>
    </AnimatedTouchableOpacity>
  );
};

export default PillButton;
