import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import AppText from '../components/Text/AppText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppPage from '../components/page/AppPage';
import AppButton from '../components/button/AppButton';
import getTextByLocale from '../app-resources/Language';
import {Button, Stack} from 'native-base';
import UserForm from '../components/form/UserForm';
import AppLogo from '../components/Logo';
import {TRootNavigation} from '../routing/types';

const styles = StyleSheet.create({
  innerContent: {
    flex: 1,
    paddingBottom: 10,
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
  register: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    link: {
      marginLeft: 5,
    },
  },
});

type T_Login_Props = NativeStackScreenProps<TRootNavigation, 'Login'>;

const Login: React.FC<T_Login_Props> = ({navigation}): JSX.Element => {
  const [isKeyboardShowm, setIskeyboardShown] = useState<boolean>(false);

  useEffect(() => {
    const keyboardShowSub = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow,
    );
    const keyboardHideSub = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    return () => {
      keyboardHideSub.remove();
      keyboardShowSub.remove();
    };
  });

  const handleKeyboardShow = () => {
    setIskeyboardShown(true);
  };

  const handleKeyboardHide = () => {
    setIskeyboardShown(false);
  };

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onPresHandler = () => {
    navigation.navigate('Home');
  };

  const handlePasswrod = (
    text: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(text.nativeEvent.text);
  };

  const handleUsername = (
    text: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setUsername(text.nativeEvent.text);
  };

  const onRegisterHandler = () => {
    navigation.navigate('Register');
  };

  return (
    <>
      <AppPage>
        <View style={styles.header}>
          <AppText type="TITLE" text={getTextByLocale().welcomeTitle} />
          {!isKeyboardShowm && (
            <>
              <AppLogo type="MAIN" />
              <AppText
                type="SUBTITLE"
                text={getTextByLocale().welcomeSubtitle}
              />
            </>
          )}
        </View>
        <View style={styles.innerContent}>
          <Stack
            direction="column"
            width={{
              base: 200,
              lg: 600,
            }}>
            <UserForm
              onChangePasswordHandler={handlePasswrod}
              onChangeUsernameHandler={handleUsername}
              username={username}
              password={password}
            />
            {!isKeyboardShowm && (
              <View style={styles.register}>
                <AppText text={getTextByLocale().registerQuestion} />
                <Button variant="link" onPress={onRegisterHandler}>
                  <AppText
                    style={styles.register.link}
                    link
                    text={getTextByLocale().registerDontHaveAnAcc}
                  />
                </Button>
              </View>
            )}
            <AppButton
              variant="solid"
              onPress={onPresHandler}
              text={getTextByLocale().loginCta}
            />
          </Stack>
        </View>
      </AppPage>
    </>
  );
};

export default Login;
