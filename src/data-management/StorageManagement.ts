import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOG_ERROR} from '../http/axios-wrapper';
import {IAppUser, StorageKeys} from './type';

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(StorageKeys.USER);
  } catch (error) {
    LOG_ERROR('CLEAR_USER_FAILED', {
      msg: 'Async storage clear user failed',
      error: error,
    });
  }
};
export const setUserToAsyncStorage = async (user: IAppUser) => {
  try {
    await AsyncStorage.setItem(StorageKeys.USER, JSON.stringify(user));
  } catch (error) {
    LOG_ERROR('SET_USER_FAILED', {msg: 'Async Set user fail', error: error});
  }
};

export const getUserFromStorage = async () => {
  try {
    const stringUser = await AsyncStorage.getItem(StorageKeys.USER);
    if (stringUser) {
      return JSON.parse(stringUser);
    }
    return null;
  } catch (error) {
    LOG_ERROR('GET USER FAILED', {msg: 'Async storage get user failed', error});
  }
};

export const setToken = async (token: string) => {
  try {
    console.log('SET TOKEN??', token);
    return await AsyncStorage.setItem(StorageKeys.JWT_TOKEN, token);
  } catch (error) {
    LOG_ERROR('SET TOKEN FAILED', {
      msg: 'Async storage SET Token failed',
      error,
    });
  }
};

export const getToken = async () => {
  try {
    const jwt_token = await AsyncStorage.getItem(StorageKeys.JWT_TOKEN);
    return jwt_token;
  } catch (error) {
    LOG_ERROR('GET TOKEN FAILED', {
      msg: 'Async storage GET Token failed',
      error,
    });
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem(StorageKeys.JWT_TOKEN);
  } catch (error) {
    LOG_ERROR('CLEAR TOKEN FAILED', {
      msg: 'Async storage CLEAR Token failed',
      error,
    });
  }
};

export const setToAsyncStorage = async (
  key: string,
  value: {[key: string]: any},
  expirationTime?: Date,
) => {
  try {
    const objectToSet = {
      ...value,
      [StorageKeys.expiration_date]: expirationTime,
    };
    await AsyncStorage.setItem(key, JSON.stringify(objectToSet));
  } catch (error) {
    LOG_ERROR('ERROR_SET_STORAGE', {
      msg: 'Async storage SET ITEM',
      error,
      key,
      value,
      expirationTime,
    });
  }
};

export const getFromAsyncStorage = async (key: string) => {
  try {
    const stringData = await AsyncStorage.getItem(key);
    if (stringData) {
      const objectData = JSON.parse(stringData);
      if (objectData[StorageKeys.expiration_date]) {
        const {exp_date} = objectData;
        if (exp_date < Date.now()) {
          await AsyncStorage.removeItem(key);
          return null;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {exp_date, ...result} = objectData;
      return result;
    }
  } catch (error) {
    LOG_ERROR('ERROR GET STORAGE', {
      msg: 'Async storage GET ITEM',
      error,
      key,
    });
  }
};
