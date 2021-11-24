import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
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
import HttpReq, {LOG_TO_BACKEND} from '../../http/axios-wrapper';
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
  const [amount, setAmount] = useState<number>(0);
  const getText = (): string => {
    const [first, second] = amountConfiguration;
    if (!first || !second) {
      return '';
    } else {
      return rawSms.slice(
        rawSms.indexOf(first.text) + 1 + first.text.length,
        rawSms.indexOf(second.text),
      );
    }
  };

  const journeyConfirmHandler = () => {
    try {
      const _amount = getText();
      const floatAmount = parseFloat(
        _amount.replace('.', '').replace(',', '.'),
      ); //some edge cases might fail here
      setAmount(floatAmount);
      setFinishDisabled(false);
    } catch (error) {
      Alert.alert('Parsing amount failed restart the journey and try again');
      LOG_TO_BACKEND('ERROR', {
        msg: 'Parsing amount failed restart the journey and try again',
        error,
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
      expenseTypes: [...getSelectedCategories().map(ct => ct.id)],
      amountLocators: amountConfiguration.map(al => al?.text),
    };
    LOG_TO_BACKEND('INFO', {
      msg: 'Request preview',
      json: JSON.stringify(requestObj),
    });
    return HttpReq.post('/balance-action/create', requestObj);
  };

  const onFinishHandler = () => {
    return createAndSendRequest()
      .then(() => {
        setTimeout(() => {
          navigation.navigate('AccountSettings');
        }, 200);
      })
      .catch(err => {
        console.log('Error while sending balance type');
        LOG_TO_BACKEND('ERROR', {
          msg: 'Balance action item failed',
          json: JSON.stringify(err),
        });
        return err;
      });
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
              amount={getText()}
              prefix={amountConfiguration[0]?.text || ''}
              sufix={amountConfiguration[1]?.text || ''}
            />
          </View>
        )}
        <AppScrollView
          heading={{type: 'LABEL', text: getTextByLocale().overviewCategories}}>
          <View style={styles.balanceType}>
            {getSelectedCategories().map(cat => {
              return (
                <OverviewInfoItem key={cat.id}>
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
