import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppText from '../../components/Text/AppText';
import {TRootNavigation} from '../../routing/types';

type T_Message_Parser_Props = NativeStackScreenProps<TRootNavigation, 'Parser'>;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Parser: React.FC<T_Message_Parser_Props> = (): JSX.Element => {
  return (
    <>
      <View style={styles.content}>
        <AppText text="AAAAAAAAA PARSER!" />
      </View>
    </>
  );
};

export default Parser;
