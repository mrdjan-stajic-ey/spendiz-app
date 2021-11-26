import AsyncStorage from '@react-native-async-storage/async-storage';
// import {LOG_TO_BACKEND} from '../http/axios-wrapper';
import {IAppUser, StorageKeys} from './type';

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(StorageKeys.USER);
  } catch (error) {
    // LOG_TO_BACKEND('ERROR', {msg: 'Async storage user clear failed', error});
  }
};
export const setUserToAsyncStorage = async (user: IAppUser) => {
  try {
    await AsyncStorage.setItem(StorageKeys.USER, JSON.stringify(user));
  } catch (error) {
    // LOG_TO_BACKEND('ERROR', {msg: 'Async storage SET user failed', error});
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
    // LOG_TO_BACKEND('ERROR', {msg: 'Async storage GET user failed', error});
  }
};

export const setToken = async (token: string) => {
  try {
    console.log('SET TOKEN??', token);
    return await AsyncStorage.setItem(StorageKeys.JWT_TOKEN, token);
  } catch (error) {
    // LOG_TO_BACKEND('ERROR', {msg: 'Async storage token SET failed', error});
  }
};

export const getToken = async () => {
  try {
    const jwt_token = await AsyncStorage.getItem(StorageKeys.JWT_TOKEN);
    return jwt_token;
  } catch (error) {
    // LOG_TO_BACKEND('ERROR', {msg: 'Async storage token GET failed', error});
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem(StorageKeys.JWT_TOKEN);
  } catch (error) {
    // LOG_TO_BACKEND('ERROR', {msg: 'Async storage token CLEAR failed', error});
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
    // LOG_TO_BACKEND('ERROR', {
    //   msg: 'Async storage SET ITEM',
    //   error,
    //   key,
    //   value,
    //   expirationTime,
    // });
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
    // LOG_TO_BACKEND('ERROR', {
    //   msg: 'Async storage GET ITEM',
    //   error,
    //   key,
    // });
  }
};
