import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Stack} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import getTextByLocale from '../app-resources/Language';
import AppButton from '../components/button/AppButton';
import AppDivider from '../components/divider/AppDivider';
import RegisterForm from '../components/form/RegisterForm';
import AppPage from '../components/page/AppPage';
import AppText from '../components/Text/AppText';
import {TRootNavigation} from '../routing/types';

const styles = StyleSheet.create({
  content: {
    paddingBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  innerContent: {
    flex: 1,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type T_Reg_Props = NativeStackScreenProps<TRootNavigation, 'Register'>;

const RegisterPage: React.FC<T_Reg_Props> = ({navigation}): JSX.Element => {
  return (
    <AppPage>
      <View style={{}}>
        <AppText
          type="TITLE"
          text={getTextByLocale().welcomeRegisterSubtitle}
        />
        <AppDivider />
      </View>
      <View style={styles.innerContent}>
        <ScrollView>
          <Stack
            direction="row"
            width={{
              base: 200,
              lg: 600,
            }}>
            <RegisterForm />
          </Stack>
        </ScrollView>
        <AppButton
          variant="solid"
          onPress={() => {}}
          text={getTextByLocale().loginCta}
        />
      </View>
    </AppPage>
  );
};

export default RegisterPage;
