import {Center} from 'native-base';
import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppButton from '../../components/button/AppButton';
import AppDivider from '../../components/divider/AppDivider';
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
        <Center marginBottom={0}>
          <AppText
            style={styles.header}
            type="TITLE"
            text={getTextByLocale().phraseBalanceOverviewTitle}
          />
        </Center>
        <AppDivider />
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
