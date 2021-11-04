import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

export interface IUserForm {
  onError?(name: string): any;
  username: string;
  password: string;
  onChangeUsernameHandler: (
    text: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => any;
  onChangePasswordHandler: (
    text: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => any;
}
