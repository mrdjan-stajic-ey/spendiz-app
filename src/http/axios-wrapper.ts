import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import {getErrorTextByLocal} from '../app-resources/Language';
import {StorageKeys} from '../data-management/type';

interface IAuthToken {
  access_token?: string;
  remember_me_code?: string;
}
type TAxiosSuper<T> = {
  data: T;
};
const baseUrl = 'http://10.0.2.2:3000';

abstract class HttpReq {
  static async getAuthorisationToken(
    allowAnon: boolean = false,
  ): Promise<IAuthToken> {
    try {
      const jwt_token = await AsyncStorage.getItem(StorageKeys.JWT_TOKEN);
      if (!jwt_token && !allowAnon) {
        return Promise.reject(getErrorTextByLocal().noJwtTokenFound);
      }
      const remeberMeCode = await AsyncStorage.getItem(
        StorageKeys.REMEMBER_ME_CODE,
      );
      return {
        access_token: jwt_token || undefined,
        remember_me_code: remeberMeCode || undefined,
      };
    } catch (error) {
      //TOODO: log the errors to the backend;
      Alert.alert(getErrorTextByLocal().localStorageErr);
      console.error('Fetch from async storage failed', error);
    }
    return {access_token: undefined, remember_me_code: undefined};
  }

  static alignServicePath = (servicePath: string) =>
    servicePath.charAt(0) === '/' ? servicePath.substring(1) : servicePath;

  public static async get<T>(servicePath: string): Promise<T> {
    const {access_token} = await this.getAuthorisationToken();
    return axios
      .get(`${baseUrl}/${this.alignServicePath(servicePath)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(data => {
        return Promise.resolve(data.data);
      });
  }
  public static async post<TReturn, Tbody extends any = any>(
    servicePath: string,
    body?: Tbody,
    allowAnon: boolean = false,
  ): Promise<TReturn> {
    const {access_token} = await this.getAuthorisationToken(allowAnon);
    return axios
      .post<Tbody, TAxiosSuper<TReturn>>(
        `${baseUrl}/${this.alignServicePath(servicePath)}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(data => {
        return Promise.resolve(data.data);
      });
  }
}

export default HttpReq;
