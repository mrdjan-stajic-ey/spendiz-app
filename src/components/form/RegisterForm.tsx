import {FormControl, Input} from 'native-base';
import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import {DEFAULT_TEXT_COLOR} from '../CONSTS';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 20,
  },
});

export interface IRegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  setEmail: (text: string) => void;
  setUsername: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
}

const RegisterForm: React.FC<IRegisterData> = ({
  email,
  password,
  username,
  setEmail,
  setPassword,
  setUsername,
  setConfirmPassword,
  confirmPassword,
}): JSX.Element => {
  const handleEmailEvent = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setEmail(event.nativeEvent.text);
  };
  const handleUsernameEvent = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setUsername(event.nativeEvent.text);
  };
  const handlePasswordEvent = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(event.nativeEvent.text);
  };
  const handleConfirmPassswordEvent = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setConfirmPassword(event.nativeEvent.text);
  };

  return (
    <View style={styles.content}>
      <FormControl isRequired>
        <FormControl.Label
          _text={{
            color: DEFAULT_TEXT_COLOR,
          }}>
          {getTextByLocale().formLabels.emailLabel}
        </FormControl.Label>
        <Input
          backgroundColor="white"
          type="text"
          onChange={handleEmailEvent}
          value={email}
          placeholder={getTextByLocale().formLabels.emailLabel}
        />
        <FormControl.HelperText
          _text={{
            color: DEFAULT_TEXT_COLOR,
          }}
          mb="5">
          {getTextByLocale().formValidationErrors.minLenght}
        </FormControl.HelperText>
        <FormControl.Label
          _text={{
            color: DEFAULT_TEXT_COLOR,
          }}>
          {getTextByLocale().formLabels.usenameLabel}
        </FormControl.Label>
        <Input
          backgroundColor="white"
          type="text"
          onChange={handleUsernameEvent}
          value={username}
          placeholder={getTextByLocale().formLabels.usenameLabel}
        />
        <FormControl.HelperText
          _text={{
            color: DEFAULT_TEXT_COLOR,
          }}
          mb="5">
          {getTextByLocale().formValidationErrors.minLenght}
        </FormControl.HelperText>
        <FormControl.Label
          _text={{
            color: DEFAULT_TEXT_COLOR,
          }}>
          {getTextByLocale().formLabels.passwordLabel}
        </FormControl.Label>
        <Input
          backgroundColor="white"
          type="password"
          onChange={handlePasswordEvent}
          value={password}
          placeholder={getTextByLocale().formLabels.passwordLabel}
        />
        <FormControl.HelperText
          _text={{
            color: DEFAULT_TEXT_COLOR,
          }}
          mb="5">
          {getTextByLocale().formValidationErrors.minLenght}
        </FormControl.HelperText>
        <FormControl.Label
          _text={{
            color: DEFAULT_TEXT_COLOR,
          }}>
          {getTextByLocale().formLabels.confirmPasswordLabel}
        </FormControl.Label>
        <Input
          backgroundColor="white"
          type="password"
          onChange={handleConfirmPassswordEvent}
          value={confirmPassword}
          placeholder={getTextByLocale().formLabels.confirmPasswordLabel}
        />
        <FormControl.HelperText
          _text={{
            color: DEFAULT_TEXT_COLOR,
          }}
          mb="5">
          {getTextByLocale().formValidationErrors.minLenght}
        </FormControl.HelperText>
      </FormControl>
    </View>
  );
};

export default RegisterForm;
