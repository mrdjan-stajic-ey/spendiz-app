import {Center} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppButton from '../../components/button/AppButton';
import PhraseConfigurator from '../../components/configurator/PhraseConfigurator';
import AppDivider from '../../components/divider/AppDivider';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';

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

const PhraseConfiguration: React.FC<{}> = (): JSX.Element => {
  return (
    <AppPage>
      <View style={styles.content}>
        <Center marginBottom={0}>
          <AppText text={getTextByLocale().phraseConfigurationTitle} />
        </Center>
        <AppDivider />
        <PhraseConfigurator />
        <AppButton text={getTextByLocale().phraseBalanceOverviewTitle} />
      </View>
    </AppPage>
  );
};

export default PhraseConfiguration;
