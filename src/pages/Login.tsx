import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/Text/AppText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootNavigation} from '../routing/BasicRouting';
import AppPage from '../components/page/AppPage';
import AppButton from '../components/button/AppButton';
import getTextByLocale from '../app-resources/Language';

const styles = StyleSheet.create({
  innerContent: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type T_Login_Props = NativeStackScreenProps<TRootNavigation, 'Login'>;

const Login: React.FC<T_Login_Props> = ({navigation}): JSX.Element => {
  const onPresHandler = () => {
    navigation.navigate('Home');
  };

  const onParserPress = () => {
    navigation.navigate('Parser');
  };
  return (
    <>
      <AppPage>
        <View style={styles.header}>
          <AppText type="TITLE" text={getTextByLocale().welcomeTitle} />
        </View>
        <View style={styles.innerContent}>
          <AppButton onPress={onPresHandler} text="Test navigation" />
          <AppButton onPress={onParserPress} text="To Parser" />
        </View>
      </AppPage>
    </>
  );
};

export default Login;
