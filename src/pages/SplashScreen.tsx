import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import getTextByLocale from '../app-resources/Language';
import {DEFAULT_TEXT_COLOR} from '../components/CONSTS';
import AppPage from '../components/page/AppPage';
import AppText from '../components/Text/AppText';
import UserContext from '../data-management/user/UserContext';
import {T_Auth_Stack} from '../routing/types';

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    marginBottom: 20,
  },
});
type T_Splash_Props = NativeStackScreenProps<T_Auth_Stack, 'Splash'>;
const SplashScreen: React.FC<T_Splash_Props> = ({navigation}): JSX.Element => {
  const {loading, userData} = useContext(UserContext);
  useEffect(() => {
    if (!loading) {
      if (userData?.user) {
        navigation.navigate('App');
      } else {
        navigation.navigate('Login');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, userData]);
  return (
    <AppPage>
      <View style={styles.splash}>
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={DEFAULT_TEXT_COLOR}
        />
        <AppText text={getTextByLocale().loading} />
      </View>
    </AppPage>
  );
};

export default SplashScreen;
