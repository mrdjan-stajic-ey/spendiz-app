import {IAppUser} from '../data-management/type';
import HttpReq from '../http/axios-wrapper';
export type TLoginParams = {
  username: string;
  password: string;
};

class UserAuth {
  constructor() {}

  public login({password, username}: TLoginParams) {
    return HttpReq.post<IAppUser>('login', {username, password}, true)
      .then(data => {
        return data;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
}

export default new UserAuth();
