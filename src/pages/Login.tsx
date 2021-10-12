import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-elements';
import AppText from '../components/Text/AppText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootNavigation} from '../routing/BasicRouting';

const styles = StyleSheet.create({
  innerContent: {
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
    <Card containerStyle={styles.innerContent}>
      <Card.Title>
        <AppText>Welcome to spendzi</AppText>
      </Card.Title>
      <View style={styles.innerContent}>
        <Button raised onPress={onPresHandler} title="Test navigation" />
        <Button raised onPress={onParserPress} title="To Parser" />
      </View>
    </Card>
  );
};

export default Login;
