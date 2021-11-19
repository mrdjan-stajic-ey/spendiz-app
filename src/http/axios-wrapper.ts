import axios from 'axios';
import {Alert} from 'react-native';
import {getErrorTextByLocal} from '../app-resources/Language';
import {getToken} from '../data-management/StorageManagement';

interface IAuthToken {
  access_token?: string;
  remember_me_code?: string;
}
type TAxiosSuper<T> = {
  data: T;
};

let baseUrl = 'http://10.0.2.2:3000';
if (__DEV__) {
} else {
  baseUrl = 'http://20.93.254.113:80';
}

export type T_LOG_Type = 'INFO' | 'VEBOSE' | 'ERROR' | 'WARNING';
const API_LOG_ENDPOINT = 'log';
export interface ILogData {
  msg: string;
  error: any;
  [key: string]: any;
}
export const LOG_TO_BACKEND = (logType: T_LOG_Type, data: ILogData) => {
  if (__DEV__) {
    console.log({LOG: `LOG-${logType}`, ...data});
    return;
  }
  axios
    .post(`${baseUrl}/${API_LOG_ENDPOINT}`, {log: logType, data})
    .catch(err => {
      console.log('sending log failed not much we can do here');
      return err;
    });
};

// const defaultTimeoutInMS = 1000 * 60 * 2;
const defaultTimeoutInMS = 1000 * 5;
const timeoutErrorMessage = getErrorTextByLocal().axiosTimeoutExceptionText;
abstract class HttpReq {
  static logErrToBackend = (error: string) => {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        console.log('Error logged to backend', error); //TODO; connect with bakcend;
        resolve(null);
      }, 200);
    });
  };

  static async getAuthorisationToken(
    allowAnon: boolean = false,
  ): Promise<IAuthToken> {
    try {
      const jwt_token = await getToken();
      if (!jwt_token && !allowAnon) {
        Alert.alert('Not authorized for this request');
        return Promise.reject(getErrorTextByLocal().noJwtTokenFound);
      }
      return {
        access_token: jwt_token || undefined,
      };
    } catch (error) {
      LOG_TO_BACKEND('ERROR', {
        msg: 'getting token from storage failed in auth',
        error: error,
      });
    }
    return {access_token: undefined, remember_me_code: undefined};
  }

  static alignServicePath = (servicePath: string) =>
    servicePath.charAt(0) === '/' ? servicePath.substring(1) : servicePath;

  public static async get<T>(servicePath: string): Promise<T | void> {
    const {access_token} = await this.getAuthorisationToken();
    return axios
      .get(`${baseUrl}/${this.alignServicePath(servicePath)}`, {
        method: 'GET',
        timeout: defaultTimeoutInMS,
        timeoutErrorMessage,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(data => {
        return Promise.resolve(data.data);
      })
      .catch(err => {
        LOG_TO_BACKEND('ERROR', {
          msg: 'GET_REQUEST_FAILED',
          error: err,
          servicePath,
        });
        return Promise.reject(err);
      });
  }
  public static async post<TReturn, Tbody extends any = any>(
    servicePath: string,
    body?: Tbody,
    allowAnon: boolean = false,
  ): Promise<TReturn> {
    let access_token = null;
    try {
      access_token = await this.getAuthorisationToken(allowAnon);
    } catch (error) {
      Alert.prompt('get auth token failed from post');
    }
    return axios
      .post<Tbody, TAxiosSuper<TReturn>>(
        `${baseUrl}/${this.alignServicePath(servicePath)}`,
        body,
        {
          timeout: defaultTimeoutInMS,
          timeoutErrorMessage,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(data => {
        if (data) {
          return Promise.resolve(data.data);
        } else {
          const axiosData = data as unknown as TReturn;
          //   const _data = data?.data;
          return axiosData;
        }
      })
      .catch(err => {
        LOG_TO_BACKEND('ERROR', {
          msg: 'POST_REQUEST_FAILED',
          error: err,
          servicePath,
          body,
        });
        return Promise.reject(err);
      });
  }
}

export default HttpReq;
