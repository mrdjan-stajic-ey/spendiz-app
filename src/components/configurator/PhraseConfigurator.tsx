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
import {
  TRACK_SWITCH_COLOR_FALSE,
  TRACK_SWITCH_COLOR_TRUE,
  TRACK_THUMB_COLOR_FALSE,
  TRACK_THUMB_COLOR_TRUE,
} from '../CONSTS';
import AppDivider from '../divider/AppDivider';
import AppText from '../Text/AppText';
const styles = StyleSheet.create({
  holder: {
    flex: 1,
    marginTop: 10,
  },
  controls: {
    marginTop: 5,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  toggleAction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceType: {
    flex: 1,
    marginTop: 5,
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
      <AppText
        type="SUBTITLE"
        text={getTextByLocale().phraseConfigurationDescription}
      />
      <View style={styles.controls}>
        <AppText
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 5}}
          type="LABEL"
          text={getTextByLocale().phraseBalanceActionLabel}
        />
        <View style={styles.toggleAction}>
          <AppText type="LABEL" text={'Add'} />
          <Switch
            trackColor={{
              true: TRACK_SWITCH_COLOR_TRUE,
              false: TRACK_SWITCH_COLOR_FALSE,
            }}
            thumbColor={`${
              isSubtract ? TRACK_THUMB_COLOR_FALSE : TRACK_THUMB_COLOR_TRUE
            }`}
            onValueChange={toggleSwitchHandler}
            value={isSubtract}
          />
          <AppText type="LABEL" text={'Subtract'} />
        </View>
        <AppDivider />
        <AppText
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 5, marginTop: 5}}
          text={getTextByLocale().phraseBankAccTypeLabel}
          type="LABEL"
        />
      </View>
      <ScrollView>
        <View style={styles.balanceType}>
          {categories.map(t => (
            <TouchableOpacity>
              <AppText
                // eslint-disable-next-line react-native/no-inline-styles
                style={{fontSize: 14}}
                text={t}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PhraseConfigurator;
