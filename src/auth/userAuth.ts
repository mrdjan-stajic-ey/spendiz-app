import {IAppUser} from '../data-management/type';
import HttpReq from '../http/axios-wrapper';

export type TLoginParams = {
  username: string;
  password: string;
};

export type TRegisterParams = {
  username: string;
  password: string;
  email: string;
};

class UserAuth {
  constructor() {}

  public login({password, username}: TLoginParams) {
    return HttpReq.post<IAppUser>('login', {username, password}, true)
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log('error login');
        return Promise.reject(err);
      });
  }

  public register({email, password, username}: TRegisterParams) {
    return HttpReq.post<IAppUser>(
      'register',
      {email, password, username},
      true,
    );
  }
}

export default new UserAuth();
