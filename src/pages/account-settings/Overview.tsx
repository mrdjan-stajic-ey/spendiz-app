import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppButton from '../../components/button/AppButton';
import {BACKGROUND_COLOR} from '../../components/CONSTS';
import PageAppHeader from '../../components/header/AppPageHeader';
import {AppLoader} from '../../components/loading/loader';
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
    getSelectedCategory,
    transactionType,
    amountConfiguration,

    rawSms,
  } = useContext(PhrasesContext);

  const [finishDisabled, setFinishDisabled] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(-1);
  const [afixes, setAfixes] = useState<{prefix: string; sufix: string}>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const amountReq = async () => {
      setIsLoading(true);
      HttpReq.post<{amount: number; prefix: string; sufix: string}>(
        'text/assume-amount',
        {
          smsContent: rawSms,
          prefixIndex: amountConfiguration[0],
          sufixIndex: amountConfiguration[1],
        },
      ).then(res => {
        console.log('amount res ovo ono', res);
        if (res) {
          const {prefix, sufix} = res;
          setAfixes({prefix: prefix, sufix: sufix});
          setAmount(res.amount);
          setIsLoading(false);
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
      expenseType: getSelectedCategory()?._id,
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

  //   const getAmountConfig = (index: number) => {
  //     // console.log('Phrases', phrases);
  //     if (!phrases[index]) {
  //       //   throw 'PHRASE_NOT_FOUND';
  //     }
  //     console.log(phrases);
  //     return phrases[index].text || 'Error';
  //   };

  return (
    <AppPage>
      <View style={styles.content}>
        <PageAppHeader text={getTextByLocale().phraseBalanceOverviewTitle} />
        {!isLoading && (
          <>
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
            <View style={styles.configuration}>
              <JourneyOverviewConfirmation
                onInvalid={journeyInvalidHandler}
                onValid={journeyConfirmHandler}
                amount={amount}
                prefix={afixes?.prefix || 'Error'}
                sufix={afixes?.sufix || 'Error'}
              />
            </View>
            <AppScrollView
              heading={{
                type: 'LABEL',
                text: getTextByLocale().overviewCategories,
              }}>
              <View style={styles.balanceType}>
                <OverviewInfoItem key={getSelectedCategory()?._id}>
                  <AppText
                    style={styles.overviewFontStyle}
                    color={BACKGROUND_COLOR}
                    text={getSelectedCategory()?.name}
                    type="NORMAL"
                  />
                </OverviewInfoItem>
              </View>
            </AppScrollView>
            <AppButton
              type="PRIMARY"
              disabled={finishDisabled}
              onPress={onFinishHandler}
              text={getTextByLocale().overviewCTA}
            />
          </>
        )}
        {isLoading && <AppLoader />}
      </View>
    </AppPage>
  );
};

export default OverviewPage;
