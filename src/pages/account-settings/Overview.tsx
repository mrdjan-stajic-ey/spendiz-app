import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';

const style = StyleSheet.create({
  content: {
    flex: 1,
  },
});

const OverviewPage: React.FC<{}> = (): JSX.Element => {
  return (
    <AppPage>
      <View style={style.content}>
        <AppText type="TITLE" text={'Overview page'} />
      </View>
    </AppPage>
  );
};

export default OverviewPage;
