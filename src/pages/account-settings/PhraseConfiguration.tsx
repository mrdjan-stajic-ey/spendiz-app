import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppButton from '../../components/button/AppButton';
import PhraseConfigurator from '../../components/configurator/PhraseConfigurator';
import PageAppHeader from '../../components/header/AppPageHeader';
import AppPage from '../../components/page/AppPage';
import PhrasesContext from '../../data-management/PhraseContext';
import {T_PhraseProps} from './types';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 5,
  },
  selectedPhrasesHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    flex: 1,
  },
  configActions: {
    flex: 1,
  },
});

const PhraseConfiguration: React.FC<T_PhraseProps> = ({
  navigation,
}): JSX.Element => {
  const {getSelectedCategories} = useContext(PhrasesContext);
  const toOverviewHandler = () => {
    navigation.navigate('Overview');
  };
  return (
    <AppPage>
      <View style={styles.content}>
        <PageAppHeader text={getTextByLocale().phraseConfigurationTitle} />
        <PhraseConfigurator />
        <AppButton
          disabled={getSelectedCategories().length === 0}
          onPress={toOverviewHandler}
          text={getTextByLocale().phraseBalanceOverviewTitle}
        />
      </View>
    </AppPage>
  );
};

export default PhraseConfiguration;
