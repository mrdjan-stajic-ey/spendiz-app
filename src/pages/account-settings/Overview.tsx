import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppButton from '../../components/button/AppButton';
import {BACKGROUND_COLOR} from '../../components/CONSTS';
import PageAppHeader from '../../components/header/AppPageHeader';
import JourneyOverviewConfirmation from '../../components/overview/OverviewConfirmation';
import AppPage from '../../components/page/AppPage';
import AppScrollView from '../../components/scrollview/AppScrollView';
import AppText from '../../components/Text/AppText';
import PhrasesContext from '../../data-management/PhraseContext';
import HttpReq, {LOG_ERROR} from '../../http/axios-wrapper';
import {TRootNavigation} from '../../routing/types';
import OverviewInfoItem from './OverviewInfoItem';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  balanceType: {
    flex: 1,
    padding: 10,
  },
  selectedCategories: {
    marginTop: 10,
    justifyContent: 'center',
  },
  overviewFontStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  configuration: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
type T_Overview_Props = NativeStackScreenProps<
  TRootNavigation,
  'Configuration'
>;
const OverviewPage: React.FC<T_Overview_Props> = ({
  navigation,
}): JSX.Element => {
  const {
    phrases,
    getSelectedCategories,
    transactionType,
    amountConfiguration,
    rawSms,
  } = useContext(PhrasesContext);

  const [finishDisabled, setFinishDisabled] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(-1);

  useEffect(() => {
    const amountReq = async () => {
      HttpReq.post<{amount: number}>('text/assume-amount', {
        smsContent: rawSms,
        prefixIndex: amountConfiguration[0],
        sufixIndex: amountConfiguration[1],
      }).then(res => {
        if (res) {
          setAmount(res.amount);
        }
      });
    };
    amountReq();
  }, [rawSms, amountConfiguration]);

  const journeyConfirmHandler = () => {
    try {
      setFinishDisabled(false);
    } catch (error) {
      Alert.alert('Parsing amount failed restart the journey and try again');
      LOG_ERROR('ERROR_CONFIRMING_JOURNEY', {
        msg: 'Parsing amount failed restart the journey and try again',
        error,
        amount: amount,
      });
    }
  };

  const journeyInvalidHandler = () => {
    navigation.navigate('AccountSettings');
  };

  const createAndSendRequest = async () => {
    const requestObj = {
      amount: amount,
      phrasesInfluence: transactionType,
      phrases: [...phrases.map(ph => ph.text)],
      expenseTypes: [...getSelectedCategories().map(ct => ct._id)],
      amountLocators: [amountConfiguration[0], amountConfiguration[1]],
      template: true,
    };
    return HttpReq.post('/balance-action/create', requestObj);
  };

  const onFinishHandler = async () => {
    try {
      await createAndSendRequest();
      setTimeout(() => {
        navigation.navigate('AccountSettings');
      }, 200);
    } catch (err) {
      console.log('Error while sending balance type');
      return err;
    }
  };

  const getAmountConfig = (index: number) => {
    if (!phrases[index]) {
      throw 'PHRASE_NOT_FOUND';
    }
    return phrases[index].text;
  };

  return (
    <AppPage>
      <View style={styles.content}>
        <PageAppHeader text={getTextByLocale().phraseBalanceOverviewTitle} />
        <AppScrollView
          heading={{
            text: getTextByLocale().overviewKeywords(transactionType),
            type: 'LABEL',
          }}>
          <View style={styles.balanceType}>
            {phrases.map(p => {
              return (
                <OverviewInfoItem key={p.id}>
                  <AppText
                    style={styles.overviewFontStyle}
                    color={BACKGROUND_COLOR}
                    type="NORMAL"
                    text={p.text}
                  />
                </OverviewInfoItem>
              );
            })}
          </View>
        </AppScrollView>

        {amountConfiguration && (
          <View style={styles.configuration}>
            <JourneyOverviewConfirmation
              onInvalid={journeyInvalidHandler}
              onValid={journeyConfirmHandler}
              amount={amount}
              prefix={getAmountConfig(0)}
              sufix={getAmountConfig(1)}
            />
          </View>
        )}
        <AppScrollView
          heading={{type: 'LABEL', text: getTextByLocale().overviewCategories}}>
          <View style={styles.balanceType}>
            {getSelectedCategories().map(cat => {
              return (
                <OverviewInfoItem key={cat._id}>
                  <AppText
                    style={styles.overviewFontStyle}
                    color={BACKGROUND_COLOR}
                    text={cat.name}
                    type="NORMAL"
                  />
                </OverviewInfoItem>
              );
            })}
          </View>
        </AppScrollView>
        <AppButton
          type="PRIMARY"
          disabled={finishDisabled}
          onPress={onFinishHandler}
          text={'Finish'}
        />
      </View>
    </AppPage>
  );
};

export default OverviewPage;
