import {useState} from 'react';
import {Animated} from 'react-native';

type TDirection = 'FORWARD' | 'BACKWARD';

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
  let handler = null;
  const [animation, _] = useState(new Animated.Value(0));

  if (direction === 'FORWARD') {
    handler = animationForward.call(null, animation);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler = animationBackward.call(null, animation);
  }
  return [handler, animation];
};

export default useAnimatedBackground;
