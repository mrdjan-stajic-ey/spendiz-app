import React from 'react';
import LottieView from 'lottie-react-native';

const AppLogo: React.FC<{}> = (): JSX.Element => {
  return (
    <LottieView
      source={require('../app-resources/lottie/money.json')}
      autoPlay
      loop
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: 150,
        height: 150,
      }}
    />
  );
};

export default AppLogo;
