import React, {useEffect, useState} from 'react';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import {PermissionsAndroid, View} from 'react-native';
import AppList from '../../components/List/AppList';
import getTextByLocale from '../../app-resources/Language';
import {SMSAppList} from './types';
import {ISmsState, TypedSmsFetcher} from '../../native-wrappers/types';

const AccountSettings: React.FC<{}> = (): JSX.Element => {
  const [smsInbox, setSmsInbox] = useState<ISmsState[] | null>(null);
  const [smsPermGranted, setSmsPermGranted] = useState<boolean>(false);
  const [askedForSmsPerm, setAskedSmsPerm] = useState<boolean>(false);
  useEffect(() => {
    const requestReadPerm = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: getTextByLocale().smsPermRequestTitle,
          message: getTextByLocale().smsRequestMessage,
          buttonPositive: getTextByLocale().smsRequestAcceptCTA,
          buttonNegative: getTextByLocale().smsRequestDeclineCTA,
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setSmsPermGranted(true);
      } else {
        setSmsPermGranted(false);
        return Promise.reject('NO_PERMS');
      }
      setAskedSmsPerm(true);
      return Promise.resolve();
    };
    requestReadPerm().then(() => {
      fetchSmsclientData();
    });
  }, []);

  const fetchSmsclientData = (): void => {
    TypedSmsFetcher.getSmsInbox()
      .then((res: any) => {
        setSmsInbox(res);
        console.log(res);
      })
      .catch(() => {
        throw 'Cannot read messages';
      });
  };
  return (
    <AppPage>
      <AppText type="SUBTITLE" text={getTextByLocale().accountSettingsTitle} />
      {smsInbox && smsPermGranted && (
        <AppList
          data={smsInbox}
          keyExtractor={SMSAppList.keyExtractor}
          renderItem={SMSAppList.renderItem}
        />
      )}
      {!smsPermGranted && askedForSmsPerm && (
        <View>
          <AppText type="TITLE" text={getTextByLocale().noSmsPermTitle} />
        </View>
      )}
    </AppPage>
  );
};

export default AccountSettings;
