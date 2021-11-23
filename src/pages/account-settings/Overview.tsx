import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppButton from '../../components/button/AppButton';
import {BACKGROUND_COLOR} from '../../components/CONSTS';
import PageAppHeader from '../../components/header/AppPageHeader';
import JourneyOverviewConfirmation from '../../components/overview/OverviewConfirmation';
import AppPage from '../../components/page/AppPage';
import AppScrollView from '../../components/scrollview/AppScrollView';
import AppText from '../../components/Text/AppText';
import PhrasesContext from '../../data-management/PhraseContext';
import HttpReq from '../../http/axios-wrapper';
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
      const floatAmount = parseFloat(getText().replace(',', '.'));
      setAmount(floatAmount);
      setFinishDisabled(false);
    } catch (error) {
      console.log('error while parsing amount');
    }
  };

  const journeyInvalidHandler = () => {
    navigation.navigate('AccountSettings');
  };

  const createAndSendRequest = async () => {
    //TODO prebaci sve na bekend sto se tice kreiranja keyworda i ostalih sranja, da li je uz svaku rec bitno koji je expanseType? (food,medical, transport? to se trenutno salje uz svaku izabranu frazu)
    const keywordsRequestBody = phrases
      .map(p => p.text)
      .map(text => {
        return {
          name: text,
          description: text,
          expenseTypes: [...getSelectedCategories().map(ct => ct.id)],
        };
      });
    const makeKeyWordRequest = (body: any) => {
      return HttpReq.post('/keyword/create', body);
    };
    const keywordPromises = [];
    for (let kRequest of keywordsRequestBody) {
      keywordPromises.push(makeKeyWordRequest(kRequest));
    }
    const results = await Promise.all(keywordPromises);
    const balanceItemRequest = {
      amount,
      phrasesInfluence: transactionType,
      phrases: [...results.map((r: any) => r.id)],
    };
    await HttpReq.post('/balance-action/create', balanceItemRequest).catch(
      err => {
        console.log('Kreiranje greska', err);
      },
    );
  };

  const onFinishHandler = () => {
    createAndSendRequest()
      .then(() => {
        navigation.navigate('AccountSettings');
      })
      .catch(err => {
        console.log('Error while sending balance type');
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
