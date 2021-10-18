import {Box} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BACKGROUND_GRADIENT_ARRAY} from '../CONSTS';
interface IAppPage extends IReactProps {}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
const AppPage: React.FC<IAppPage> = ({children}): JSX.Element => {
  return (
    <Box
      bg={{
        linearGradient: {
          colors: BACKGROUND_GRADIENT_ARRAY,
          start: [0, 0],
          end: [0, 1],
        },
      }}
      flex={1}
      padding={5}>
      <View style={styles.content}>{children}</View>
    </Box>
  );
};

export default AppPage;
