import React, {useEffect, useState} from 'react';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import {PermissionsAndroid, TouchableOpacity, View} from 'react-native';
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
      }
      setAskedSmsPerm(true);
    };
    requestReadPerm();
  }, []);

  const handleSmsInboxRequest = (): void => {
    TypedSmsFetcher.getSmsInbox()
      .then((res: any) => {
        setSmsInbox(res);
      })
      .catch((err: any) => {
        console.error('Sms fetch faiiled', err);
      });
  };
  return (
    <AppPage>
      <TouchableOpacity onPress={handleSmsInboxRequest}>
        <AppText text="Application settings will be here" />
      </TouchableOpacity>
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
