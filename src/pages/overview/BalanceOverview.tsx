import React, {useContext, useEffect, useState} from 'react';
import {Box, Center} from 'native-base';
import {StyleSheet, View} from 'react-native';
import getMoney, {Currency} from '../../app-resources/Currency';
import getTextByLocale from '../../app-resources/Language';
import BalanceModuleItem from '../../components/balance/BalanceOverviewItem';
import AppPage from '../../components/page/AppPage';
import AppScrollableView from '../../components/scrollableView/ScrollableView';
import AppText from '../../components/Text/AppText';
import AppIcon from '../../components/Icon/AppIcon';
import {faSms} from '@fortawesome/free-solid-svg-icons';
import {MODULE_TYPES, T_Expenses_Props} from './type';
import {listData as expenseData, MODULES_INFO} from './data';
import AppList from '../../components/List/AppList';
import AppChart from '../../components/chart/AppChart';
import {BACKGROUND_ITEM_DEFAULT} from '../../components/CONSTS';
import AppDivider from '../../components/divider/AppDivider';
// import HttpReq from '../../http/axios-wrapper';
import UserContext from '../../data-management/user/UserContext';

const styles = StyleSheet.create({
  scrollContent: {
    margin: 10,
    flexDirection: 'row',
  },
  balanceOverviewTotals: {
    marginTop: 5,
    flexDirection: 'row',
  },
  balanceBox: {
    backgroundColor: BACKGROUND_ITEM_DEFAULT,
    marginBottom: 10,
  },
  balanceBoxMyBalance: {
    flexDirection: 'row',
  },
  balanceMessage: {
    marginLeft: 150,
  },
  overviewSpent: {
    marginRight: 50,
  },
  moduleStyle: {
    flex: 1,
    marginTop: 10,
  },
  expenseModuleChartHolder: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
const BalanceOverview: React.FC<T_Expenses_Props> = ({
  navigation,
}): JSX.Element => {
  const {userData} = useContext(UserContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [incomingMessage, setIncomingMessage] = useState<boolean>(false);
  const messageStyle = incomingMessage ? 'red' : 'blue'; //TODO: get better indicator colors

  useEffect(() => {
    // HttpReq.get<{_id: string; name: string; description: string}>('/expense') //TODO:Remove this, was for testing purposes only
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => console.log('what', err));
  }, []);

  const [currentModule, setCurrentModule] = useState<MODULE_TYPES>(
    MODULE_TYPES.BALANCE,
  );
  const renderModule = (): JSX.Element | null => {
    switch (currentModule) {
      case 'Balance': {
        return (
          <View style={styles.expenseModuleChartHolder}>
            <AppChart />
          </View>
        );
      }
      case 'Trends': {
        return <AppText text={'Chart sa onog ekrana'} />;
      }
      case 'Savings': {
        return <AppText text={'Koliko mi ostaje posle svake plate'} />;
      }
      case 'Expenses': {
        return (
          <AppList
            data={expenseData.data}
            keyExtractor={expenseData.keyExtractor}
            renderItem={expenseData.renderItem}
          />
        );
      }
      default: {
        return null;
      }
    }
  };
  const onModulePressHandler = (type: MODULE_TYPES) => {
    if (type === MODULE_TYPES.SETTINGS) {
      navigation.navigate('AccountSettings');
    }
    setCurrentModule(type);
  };
  return (
    <AppPage>
      <Center>
        <AppText type="TITLE" text={getTextByLocale().balanceOverview} />
        <AppDivider />
      </Center>
      <View>
        <AppScrollableView horizontal={true}>
          <View style={styles.scrollContent}>
            {MODULES_INFO.map(({src, name, type}, index) => {
              return (
                <BalanceModuleItem
                  onPress={() => {
                    onModulePressHandler(type);
                  }}
                  name={name}
                  key={index}
                  src={src}
                />
              );
            })}
          </View>
        </AppScrollableView>
        <Box style={styles.balanceBox} rounded={'xl'} padding={5} marginTop={5}>
          <View style={styles.balanceBoxMyBalance}>
            <View>
              <AppText
                type="SUBTITLE"
                text={`${userData?.user.username}'s balance'`}
              />
              <AppText type="NORMAL" text={getMoney(25877.99, Currency.RSD)} />
            </View>
            <View style={styles.balanceMessage}>
              <AppIcon style={{backgroundColor: messageStyle}} icon={faSms} />
            </View>
          </View>
          <View style={styles.balanceOverviewTotals}>
            <View style={styles.overviewSpent}>
              <AppText type="NORMAL" text={'Monthly spending'} />
              <AppText type="NORMAL" text={getMoney(1250, Currency.RSD)} />
            </View>
            <View>
              <AppText type="NORMAL" text={'Monthly remaining'} />
              <AppText type="NORMAL" text={getMoney(600, Currency.RSD)} />
            </View>
          </View>
        </Box>
        <AppDivider />
      </View>
      <View style={styles.moduleStyle}>{renderModule()}</View>
    </AppPage>
  );
};

export default BalanceOverview;
