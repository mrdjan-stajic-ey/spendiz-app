import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/Text/AppText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppPage from '../components/page/AppPage';
import AppButton from '../components/button/AppButton';
import getTextByLocale from '../app-resources/Language';
import {Stack} from 'native-base';
import UserForm from '../components/form/UserForm';
import AppLogo from '../components/Logo';
import {TRootNavigation} from '../routing/types';

const styles = StyleSheet.create({
  innerContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});

type T_Login_Props = NativeStackScreenProps<TRootNavigation, 'Login'>;

const Login: React.FC<T_Login_Props> = ({navigation}): JSX.Element => {
  const onPresHandler = () => {
    navigation.navigate('Home');
  };
  return (
    <>
      <AppPage>
        <View style={styles.header}>
          <AppText type="TITLE" text={getTextByLocale().welcomeTitle} />
          <AppLogo type="MAIN" />
          <AppText type="SUBTITLE" text={getTextByLocale().welcomeSubtitle} />
        </View>
        <View style={styles.innerContent}>
          <Stack
            direction="column"
            width={{
              base: 200,
              lg: 600,
            }}>
            <UserForm />
            <AppButton variant="solid" onPress={onPresHandler} text="Login" />
          </Stack>
        </View>
      </AppPage>
    </>
  );
};

export default Login;
