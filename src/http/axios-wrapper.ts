import axios from 'axios';
import {Alert} from 'react-native';
import {getErrorTextByLocal} from '../app-resources/Language';
import {getToken} from '../data-management/StorageManagement';

interface IAuthToken {
  access_token?: string;
  remember_me_code?: string;
}
type TAxiosSuper<T extends any = null> = {
  data: T;
};

export const REQUEST_ERRORS = {
  GET_FAILED: 'GET_REQUEST_FAILED',
  POST_FAILED: 'POST_REQUEST_FAILED',
};

let defaultTimeoutInMS = 1000 * 60 * 2;

if (__DEV__) {
  defaultTimeoutInMS = 1000 * 5;
}

let baseUrl = 'http://10.0.2.2:3000';
if (__DEV__) {
} else {
  baseUrl = 'http://20.93.254.113:80';
}

export const getBaseUrl = () => {
  return baseUrl;
};

export type T_LOG_Type = 'INFO' | 'VEBOSE' | 'ERROR' | 'WARNING';
const API_LOG_ENDPOINT = 'log';
export interface ILogData {
  msg?: string;
  error?: any;
  [key: string]: any;
}
export const LOG_TO_BACKEND = (options: {
  logType: T_LOG_Type;
  MESSAGE: string;
  body?: {[key: string]: any};
  data?: ILogData;
}) => {
  if (__DEV__) {
    console.log(
      {LOG: `LOG-${options.logType} :MSG-${options.MESSAGE} `},
      'options ',
      JSON.stringify(options.body),
    );
    return;
  }
  axios
    .post(`${baseUrl}/${API_LOG_ENDPOINT}`, {
      LOG_LEVEL: options.logType,
      body: options.body,
      MESSAGE: options.MESSAGE,
      data: options.data || null,
    })
    .catch(err => {
      console.log('sending log failed not much we can do here');
      return err;
    });
};

export const LOG_ERROR = (
  message: string,
  body?: {[key: string]: any},
  data?: any,
) => {
  LOG_TO_BACKEND({MESSAGE: message, logType: 'ERROR', body, data});
};

const timeoutErrorMessage = getErrorTextByLocal().axiosTimeoutExceptionText;
abstract class HttpReq {
  static async getAuthorisationToken(
    allowAnon: boolean = false,
  ): Promise<IAuthToken> {
    return new Promise((resolve, reject) => {
      try {
        getToken()
          .then(data => {
            if (data) {
              resolve({access_token: data});
            }
            if (allowAnon) {
              resolve({});
            }
          })
          .catch(_error => {
            if (allowAnon) {
              return Promise.resolve(null);
            }
            Alert.alert('Not authorized for this request');
            reject(getErrorTextByLocal().noJwtTokenFound);
          });
      } catch (error) {
        LOG_ERROR(
          'Getting token from storage faild in auth',
          undefined,
          JSON.stringify(error),
        );
      }
      return {access_token: undefined, remember_me_code: undefined};
    });
  }

  static alignServicePath = (servicePath: string) =>
    servicePath.charAt(0) === '/' ? servicePath.substring(1) : servicePath;

  public static async get<T>(servicePath: string): Promise<T | null> {
    let accessToken = null;
    try {
      accessToken = await this.getAuthorisationToken();
    } catch (error) {
      LOG_ERROR('GET_REQUEST FAILED', {error, servicePath});
      return Promise.reject(error);
    }
    return await axios
      .get<T>(`${baseUrl}/${this.alignServicePath(servicePath)}`, {
        method: 'GET',
        timeout: defaultTimeoutInMS,
        timeoutErrorMessage,
        headers: {
          Authorization: `Bearer ${accessToken.access_token}`,
        },
      })
      .then(data => {
        return Promise.resolve(data.data);
      })
      .catch(error => {
        LOG_ERROR(REQUEST_ERRORS.GET_FAILED, {error, servicePath});
        return Promise.reject(error);
      });
  }
  public static async post<TReturn, Tbody extends any = any>(
    servicePath: string,
    body?: Tbody,
    allowAnon: boolean = false,
  ): Promise<TReturn | null> {
    let accessToken = null;
    try {
      accessToken = await this.getAuthorisationToken(allowAnon);
    } catch (error) {
      LOG_ERROR('TOKEN_FETCH_FAILED', {error});
      return Promise.reject(error);
    }
    return axios
      .post<Tbody, TAxiosSuper<TReturn>>(
        `${baseUrl}/${this.alignServicePath(servicePath)}`,
        body,
        {
          timeout: defaultTimeoutInMS,
          timeoutErrorMessage,
          headers: {
            Authorization: `Bearer ${accessToken.access_token}`,
            'content-type': 'application/json',
          },
        },
      )
      .then(data => {
        if (data) {
          return Promise.resolve(data.data);
        } else {
          return Promise.resolve(null);
        }
      })
      .catch(error => {
        LOG_ERROR(REQUEST_ERRORS.POST_FAILED, {error, body, servicePath});
        return Promise.reject(error);
      });
  }
}

export default HttpReq;
