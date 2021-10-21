import React from 'react';
import LottieView from 'lottie-react-native';

type TLottieIcon = 'MAIN' | 'ERROR';
interface ILottieView {
  style?: {width: number; height: number};
  type: TLottieIcon;
}

const Lottie_ICON_MAPING = {
  MAIN: require('../app-resources/lottie/money.json'),
  ERROR: require('../app-resources/lottie/error-cat.json'),
};

const AppLogo: React.FC<ILottieView> = ({
  type = 'MAIN',
  style,
}): JSX.Element => {
  console.log('lottie view', type);
  return (
    <LottieView
      source={Lottie_ICON_MAPING[type]}
      autoPlay
      loop
      // eslint-disable-next-line react-native/no-inline-styles
      style={[style || {width: 150, height: 150}]}
    />
  );
};

export default AppLogo;
