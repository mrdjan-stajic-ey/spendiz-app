import {PermissionsAndroid} from 'react-native';
import getTextByLocale from '../app-resources/Language';
//TODO: generalize this if needed for more permissions
const requirePerms = async () => {
  return new Promise<boolean>(async (resolve, reject) => {
    const hasPerms = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: getTextByLocale().smsPermRequestTitle,
        message: getTextByLocale().smsRequestMessage,
        buttonPositive: getTextByLocale().smsRequestAcceptCTA,
        buttonNegative: getTextByLocale().smsRequestDeclineCTA,
      },
    );
    if (hasPerms === PermissionsAndroid.RESULTS.GRANTED) {
      resolve(true);
    }
    reject(false);
  });
};

export default requirePerms;
