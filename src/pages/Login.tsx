import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  ScrollView,
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
import {T_Auth_Stack} from '../routing/types';
import PageAppHeader from '../components/header/AppPageHeader';
import userAuth from '../auth/userAuth';
import UserContext from '../data-management/user/UserContext';
import {
  setToken,
  setUserToAsyncStorage,
} from '../data-management/StorageManagement';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  innerContent: {
    flex: 1,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
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

type T_Login_Props = NativeStackScreenProps<T_Auth_Stack, 'Login'>;

const Login: React.FC<T_Login_Props> = ({navigation}): JSX.Element => {
  const [isKeyboardShowm, setIskeyboardShown] = useState<boolean>(false);
  const {setUser} = useContext(UserContext);

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

  const onPresHandler = async () => {
    return userAuth
      .login({username, password})
      .then(async data => {
        if (data) {
          console.log('Login result', data);
          setUser(data);
          await setUserToAsyncStorage(data);
          await setToken(data.access_token);
          navigation.navigate('App');
        }
      })
      .catch(err => {
        console.log('Login failed', err);
      });
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
          <PageAppHeader text={getTextByLocale().welcomeTitle} />
          {__DEV__ && <AppText type="SUBTITLE" text="Development version" />}
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
        <ScrollView>
          <View style={styles.content}>
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
              </Stack>
            </View>
          </View>
        </ScrollView>
        <AppButton
          disableAsyncBehaviour
          disabled={username.length < 6 || password.length < 6}
          variant="solid"
          type="PRIMARY"
          onPress={onPresHandler}
          text={getTextByLocale().loginCta}
        />
      </AppPage>
    </>
  );
};

export default Login;
