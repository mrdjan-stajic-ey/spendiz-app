import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import getTextByLocale from '../../app-resources/Language';
import AppButton from '../button/AppButton';
import AppDivider from '../divider/AppDivider';
import AppText from '../Text/AppText';
import TextHighlit from './TextHightlit';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  words: {flex: 1},
  ctas: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmation: {
    flex: 1,
    alignItems: 'center',
  },
});

interface IJourneryCofirmation {
  prefix: string;
  sufix: string;
  amount: string;
  onValid: () => void;
  onInvalid: () => void;
}

const JourneyOverviewConfirmation: React.FC<IJourneryCofirmation> = ({
  amount,
  onInvalid,
  onValid,
  prefix,
  sufix,
}): JSX.Element => {
  return (
    <View style={styles.content}>
      <AppText
        type="SUBTITLE"
        text={getTextByLocale().overviewConfigurationQuestion}
      />
      <AppDivider />
      <View style={styles.words}>
        <TextHighlit
          highlightWord={prefix}
          sentence={getTextByLocale().overviewConfigConfirmation(prefix, true)}
        />
        <TextHighlit
          highlightWord={sufix}
          sentence={getTextByLocale().overviewConfigConfirmation(sufix, false)}
        />
        <TextHighlit
          highlightWord={amount}
          sentence={getTextByLocale().overviewConfigurationAssumption(amount)}
        />
        <AppDivider />
      </View>
      <View style={styles.confirmation}>
        <View style={styles.ctas}>
          <AppButton onPress={onValid} icon={faCheckCircle} />
          <AppButton onPress={onInvalid} icon={faTimesCircle} />
        </View>
      </View>
    </View>
  );
};

export default JourneyOverviewConfirmation;
