import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import PhrasesContext from '../../data-management/PhraseContext';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

const PhraseConfiguration: React.FC<{}> = (): JSX.Element => {
  const {phrases} = useContext(PhrasesContext);
  return (
    <AppPage>
      <View style={styles.content}>
        <AppText text="Phrase Configgg" />
        <AppText text={phrases.length + '' || '0'} />
      </View>
    </AppPage>
  );
};

export default PhraseConfiguration;
