import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import getTextByLocale from '../app-resources/Language';
import userAuth from '../auth/userAuth';
import AppButton from '../components/button/AppButton';
import AppDivider from '../components/divider/AppDivider';
import RegisterForm from '../components/form/RegisterForm';
import PageAppHeader from '../components/header/AppPageHeader';
import AppPage from '../components/page/AppPage';
import {LOG_ERROR} from '../http/axios-wrapper';
import {T_Auth_Stack} from '../routing/types';

const styles = StyleSheet.create({
  content: {
    paddingBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContent: {
    flex: 1,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type T_Reg_Props = NativeStackScreenProps<T_Auth_Stack, 'Register'>;

const RegisterPage: React.FC<T_Reg_Props> = ({navigation}): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleRegister = async () => {
    try {
      const result = await userAuth.register({email, password, username});
      console.log('registration successfull', result);
      navigation.navigate('Login');
    } catch (error) {
      console.log('reg failed');
      LOG_ERROR('REGISTRATION FAILED', {error});
    }
  };
  return (
    <AppPage>
      <View style={styles.content}>
        <PageAppHeader
          textOnly
          textSize={'SMALL'}
          text={getTextByLocale().welcomeRegisterSubtitle}
        />
        <AppDivider />
      </View>
      <ScrollView>
        <View style={styles.innerContent}>
          <RegisterForm
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            setPassword={setPassword}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            username={username}
            password={password}
          />
        </View>
      </ScrollView>
      <AppButton
        disableAsyncBehaviour
        variant="solid"
        onPress={handleRegister}
        text={getTextByLocale().registerCta}
      />
    </AppPage>
  );
};

export default RegisterPage;
