import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BACKGROUND_COLOR} from '../CONSTS';
interface IAppPage extends IReactProps {}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
});

const AppPage: React.FC<IAppPage> = ({children}): JSX.Element => {
  return <View style={styles.content}>{children}</View>;
};

export default AppPage;
