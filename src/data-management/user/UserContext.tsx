import React from 'react';
import {IUserContext} from '../type';

const UserContext = React.createContext<IUserContext>({
  userData: undefined,
  access_token: undefined,
  clearUser: () => Promise.resolve(),
  setUser: () => {},
  loading: true,
});

export default UserContext;
