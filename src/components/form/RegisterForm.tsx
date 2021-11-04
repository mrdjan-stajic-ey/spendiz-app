import {FormControl, Input} from 'native-base';
import React from 'react';
import getTextByLocale from '../../app-resources/Language';
import {DEFAULT_TEXT_COLOR} from '../CONSTS';

const RegisterForm: React.FC<{}> = (): JSX.Element => {
  return (
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
        onChange={() => {}}
        value={'Email'}
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
        onChange={() => {}}
        value={'Email'}
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
        type="text"
        onChange={() => {}}
        value={'Email'}
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
        type="text"
        onChange={() => {}}
        value={'Email'}
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
  );
};

export default RegisterForm;
