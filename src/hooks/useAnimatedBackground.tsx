import {useState} from 'react';
import {Animated} from 'react-native';

type TDirection = 'FORWARD' | 'BACKWARD';
interface IInterpolation {
  inputRange: number[];
  outputRange: string[];
}
const animationForward = (animation: any) => {
  return Animated.timing(animation, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
  });
};

const animationBackward = (animation: any) => {
  return Animated.timing(animation, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: false,
  });
};

const useAnimatedBackground = (direction: TDirection) => {
  //TODO: add more props for timing, interpolation, easing and such
  let handler = null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [animation, _] = useState(new Animated.Value(0));

  if (direction === 'FORWARD') {
    handler = animationForward.bind(null, animation);
  } else {
    handler = animationBackward.bind(null, animation);
  }
  handler().start();
  const getStyles = (props: IInterpolation) => {
    return animation.interpolate(props);
  };

  return [getStyles];
};

export default useAnimatedBackground;
