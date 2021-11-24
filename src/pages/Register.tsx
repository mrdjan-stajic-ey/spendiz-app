import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import getTextByLocale from '../app-resources/Language';
import AppButton from '../components/button/AppButton';
import AppDivider from '../components/divider/AppDivider';
import RegisterForm from '../components/form/RegisterForm';
import AppPage from '../components/page/AppPage';
import AppText from '../components/Text/AppText';
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
  const handleRegister = () => {
    navigation.navigate('App');
  };
  return (
    <AppPage>
      <View style={styles.content}>
        <AppText
          type="SUBTITLE"
          text={getTextByLocale().welcomeRegisterSubtitle}
        />
        <AppText
          color="red"
          type="LABEL"
          text={'This page is not functional yet'}
        />
        <AppDivider />
      </View>
      <ScrollView>
        <View style={styles.innerContent}>
          <RegisterForm />
        </View>
      </ScrollView>
      <AppButton
        variant="solid"
        onPress={handleRegister}
        text={getTextByLocale().registerCta}
      />
    </AppPage>
  );
};

export default RegisterPage;
