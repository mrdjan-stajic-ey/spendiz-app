import React from 'react';
import {FormControl, Input} from 'native-base';
import {DEFAULT_TEXT_COLOR} from '../CONSTS';
import getTextByLocale from '../../app-resources/Language';
import {IUserForm} from './types';

const UserForm: React.FC<IUserForm> = ({
  username,
  password,
  onChangePasswordHandler,
  onChangeUsernameHandler,
}): JSX.Element => {
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
        onChange={onChangeUsernameHandler}
        value={username}
        placeholder={getTextByLocale().formLabels.usernamePlaceholder}
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
        onChange={onChangePasswordHandler}
        value={password}
        placeholder={getTextByLocale().formLabels.passwordPlaceholder}
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
