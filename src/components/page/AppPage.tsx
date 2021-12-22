import {Box, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {PRIMARY_BACKGROUND_COLOR} from '../CONSTS';
import {IAppPage} from './types';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

interface IAppPageContainer {
  style?: {
    [key: string]: any;
  };
}

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
const AppPageContentHolder: React.FC<IAppPageContainer> = ({
  children,
  style,
}): JSX.Element => {
  const hasCustomStyle = Object.keys(style || {}).length > 0;

  return (
    <Box
      backgroundColor={PRIMARY_BACKGROUND_COLOR}
      flex={1}
      padding={hasCustomStyle ? style.padding : 1}
      paddingTop={2}
      paddingBottom={hasCustomStyle ? style.paddingBottom : 0}>
      {children}
    </Box>
  );
};

const AppPage: React.FC<IAppPage & IAppPageContainer> = ({
  children,
  style,
}): JSX.Element => {
  return (
    <AppPageContentHolder style={style}>
      <View style={styles.content}>{children}</View>
    </AppPageContentHolder>
  );
};

export default AppPage;
