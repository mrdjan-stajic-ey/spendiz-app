import React, {useContext} from 'react';
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

const OverviewPage: React.FC<{}> = (): JSX.Element => {
  const {
    phrases,
    getSelectedCategories,
    transactionType,
    amountConfiguration,
    rawSms,
  } = useContext(PhrasesContext);
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
              onInvalid={() => {}}
              onValid={() => {}}
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
          onPress={() => {
            //todo implement
          }}
          text={'Finish'}
        />
      </View>
    </AppPage>
  );
};

export default OverviewPage;
