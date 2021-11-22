import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppButton from '../../components/button/AppButton';
import {BACKGROUND_COLOR} from '../../components/CONSTS';
import AppDivider from '../../components/divider/AppDivider';
import PageAppHeader from '../../components/header/AppPageHeader';
import AppPage from '../../components/page/AppPage';
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
  header: {},
  overviewKeywordsHolder: {
    flex: 1,
    marginTop: 5,
  },
  overviewCategoriesHolder: {
    marginTop: 5,
    flex: 1,
  },
  selectedCategories: {
    marginTop: 10,
    justifyContent: 'center',
  },
  overviewFontStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const OverviewPage: React.FC<{}> = (): JSX.Element => {
  const {phrases, getSelectedCategories, transactionType, amountConfiguration} =
    useContext(PhrasesContext);
  return (
    <AppPage>
      <View style={styles.content}>
        <PageAppHeader text={getTextByLocale().phraseBalanceOverviewTitle} />
        <View style={styles.overviewKeywordsHolder}>
          <AppText
            type="LABEL"
            text={getTextByLocale().overviewKeywords(transactionType)}
          />
          <ScrollView>
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
          </ScrollView>
        </View>
        <View style={styles.overviewCategoriesHolder}>
          <AppText type="LABEL" text={getTextByLocale().overviewCategories} />
          <AppDivider />
          <ScrollView contentContainerStyle={styles.selectedCategories}>
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
          </ScrollView>
        </View>
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
