import React, {useEffect, useState} from 'react';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import AppList from '../../components/List/AppList';
import getTextByLocale from '../../app-resources/Language';
import {SMSAppList, T_Account_Settins} from './types';
import {ISmsState, TypedSmsFetcher} from '../../native-wrappers/types';
import AppSmsMessage from '../../components/message/Message';
import requirePerms from '../../permissions/SmsPerm';
import {View} from 'react-native';
import {Center} from 'native-base';

const AccountSettings: React.FC<T_Account_Settins> = ({
  navigation,
}): JSX.Element => {
  const [smsInbox, setSmsInbox] = useState<ISmsState[] | null>(null);
  const [smsPermGranted, setSmsPermGranted] = useState<boolean>(false);
  const [askedForSmsPerm, setAskedSmsPerm] = useState<boolean>(false);
  useEffect(() => {
    const requestReadPerm = async () => {
      const granted = await requirePerms();
      if (granted) {
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

  const renderSmsItem = (item: ISmsState, onClickHandler: () => void) => {
    return (
      <AppSmsMessage
        body={item.body}
        date_sent={item.date_sent}
        sender={item.sender}
        onItemClick={() => {
          onClickHandler();
        }}
      />
    );
  };

  return (
    <AppPage>
      <Center>
        <AppText
          type="SUBTITLE"
          text={getTextByLocale().accountSettingsTitle}
        />
      </Center>
      {smsInbox && smsPermGranted && (
        <AppList
          data={smsInbox}
          keyExtractor={SMSAppList.keyExtractor}
          renderItem={({item}) =>
            renderSmsItem(item, () => {
              navigation.navigate('Configuration', {
                screen: 'Parser',
                params: item,
              });
            })
          }
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
