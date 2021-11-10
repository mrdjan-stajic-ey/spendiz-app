import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {getErrorTextByLocal} from '../app-resources/Language';
import {IAppUser} from './type';

export enum StorageKeys {
  USER = 'USER',
  JWT_TOKEN = 'JWT',
  REMEMBER_ME_CODE = 'REMEBER_ME_CODE',
  expiration_date = 'exp_date',
}

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(StorageKeys.USER);
  } catch (error) {
    console.error('Clear local storage error', error);
    Alert.alert(getErrorTextByLocal().localStorageErr);
  }
};
export const addUser = async (user: IAppUser) => {
  try {
    await AsyncStorage.setItem(StorageKeys.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Seting user to local storage failed', error);
    Alert.alert(getErrorTextByLocal().localStorageErr);
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
    console.error('Fetching user from local storage failed', error);
    Alert.alert(getErrorTextByLocal().localStorageErr);
  }
};

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(StorageKeys.JWT_TOKEN, token);
  } catch (error) {
    console.error('JWT token set failed', error);
    Alert.alert(getErrorTextByLocal().localStorageErr);
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem(StorageKeys.JWT_TOKEN);
  } catch (error) {
    console.error('Removing jwt token failed', error);
    Alert.alert(getErrorTextByLocal().localStorageErr);
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
    console.error('Setting the data into local storage failed', error);
    Alert.alert(getErrorTextByLocal().localStorageErr);
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
  } catch (error) {}
};
