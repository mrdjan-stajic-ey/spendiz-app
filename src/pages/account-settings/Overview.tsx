import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppButton from '../../components/button/AppButton';
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
});

const OverviewPage: React.FC<{}> = (): JSX.Element => {
  const {phrases, categories} = useContext(PhrasesContext);
  return (
    <AppPage>
      <View style={styles.content}>
        <PageAppHeader text={getTextByLocale().phraseBalanceOverviewTitle} />
        <View style={styles.overviewKeywordsHolder}>
          <AppText type="LABEL" text={getTextByLocale().overviewKeywords} />
          <ScrollView>
            <View style={styles.balanceType}>
              {phrases.map(p => {
                return <OverviewInfoItem> {p.text} </OverviewInfoItem>;
              })}
            </View>
          </ScrollView>
        </View>
        <View style={styles.overviewCategoriesHolder}>
          <AppText type="LABEL" text={getTextByLocale().overviewCategodies} />
          <AppDivider />
          <ScrollView>
            <View style={styles.balanceType}>
              {categories.map(p => {
                return <OverviewInfoItem> {p} </OverviewInfoItem>;
              })}
            </View>
          </ScrollView>
        </View>
        <AppButton text={'Finish'} />
      </View>
    </AppPage>
  );
};

export default OverviewPage;
