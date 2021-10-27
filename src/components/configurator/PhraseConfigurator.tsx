import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import PhrasesContext from '../../data-management/PhraseContext';
import AppDivider from '../divider/AppDivider';
import AppText from '../Text/AppText';
const styles = StyleSheet.create({
  holder: {
    flex: 1,
    marginTop: 10,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  controls: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  toggleAction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceType: {
    flex: 1,
  },
});
const PhraseConfigurator: React.FC<{}> = (): JSX.Element => {
  const [isSubtract, setIsSubtract] = useState<boolean>(true);
  const {categories} = useContext(PhrasesContext);

  const toggleSwitchHandler = () => {
    setIsSubtract(() => {
      return !isSubtract;
    });
  };
  return (
    <View style={styles.holder}>
      <AppText text={getTextByLocale().phraseConfigurationDescription} />
      <View style={styles.controls}>
        <AppText
          type="LABEL"
          text={getTextByLocale().phraseBalanceActionLabel}
        />
        <View style={styles.toggleAction}>
          <AppText text={'Add'} />
          <Switch onValueChange={toggleSwitchHandler} value={isSubtract} />
          <AppText text={'Subtract'} />
        </View>
        <AppDivider />
        <AppText text={getTextByLocale().phraseBankAccTypeLabel} type="LABEL" />
      </View>
      <ScrollView>
        <View style={styles.balanceType}>
          {categories.map(t => (
            <TouchableOpacity>
              <AppText text={t} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PhraseConfigurator;
