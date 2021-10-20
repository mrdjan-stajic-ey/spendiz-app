import {Box, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {BACKGROUND_GRADIENT_ARRAY} from '../CONSTS';
import {IAppPage} from './types';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
//Default settings for lineargradient
const _boxHolderDefaultProps = {
  linearGradient: {
    colors: BACKGROUND_GRADIENT_ARRAY,
    start: [0, 0],
    end: [0, 1],
  },
};

//native base box as a basic page content holder
const AppPageContentHolder: React.FC<{}> = ({children}): JSX.Element => {
  return (
    <Box bg={_boxHolderDefaultProps} flex={1} padding={5}>
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
