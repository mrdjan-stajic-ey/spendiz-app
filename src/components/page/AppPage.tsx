import {Box, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {PRIMARY_BACKGRORUND_COLOR} from '../CONSTS';
import {IAppPage} from './types';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
//Default settings for lineargradient
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _boxHolderDefaultProps = {
  //   linearGradient: {
  //     colors: BACKGROUND_GRADIENT_ARRAY,
  //     start: [0, 0],
  //     end: [0, 1],
  //   },
  backgroundColor: '#302D43',
};

//native base box as a basic page content holder
const AppPageContentHolder: React.FC<{}> = ({children}): JSX.Element => {
  return (
    <Box
      backgroundColor={PRIMARY_BACKGRORUND_COLOR}
      //   bg={_boxHolderDefaultProps}
      flex={1}
      padding={5}>
      {children}
    </Box>
  );
};

const AppPage: React.FC<IAppPage> = ({children}): JSX.Element => {
  return (
    <AppPageContentHolder>
      <View style={styles.content}>{children}</View>
    </AppPageContentHolder>
  );
};

export default AppPage;
