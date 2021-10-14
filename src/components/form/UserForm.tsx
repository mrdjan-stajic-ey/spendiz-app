import React from 'react';
import {FormControl, Input} from 'native-base';
import {DEFAULT_TEXT_COLOR} from '../CONSTS';
import getTextByLocale from '../../app-resources/Language';

interface IUserForm {
  onError?(name: string): any;
}

const UserForm: React.FC<IUserForm> = (): JSX.Element => {
  return (
    <FormControl isRequired>
      <FormControl.Label
        _text={{
          color: DEFAULT_TEXT_COLOR,
        }}>
        {getTextByLocale().usernameLabel}
      </FormControl.Label>
      <Input
        backgroundColor="white"
        type="text"
        value="Mrdjan"
        placeholder="Username"
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
        {getTextByLocale().passwordLabel}
      </FormControl.Label>
      <Input
        backgroundColor="white"
        type="password"
        value="mrdjan"
        placeholder="password"
      />
      <FormControl.HelperText
        _text={{
          color: DEFAULT_TEXT_COLOR,
        }}>
        {getTextByLocale().formValidationErrors.minLenght}
      </FormControl.HelperText>
    </FormControl>
  );
};

export default UserForm;
