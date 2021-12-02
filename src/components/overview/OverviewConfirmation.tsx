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
  heading: {
    alignItems: 'center',
  },
  words: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  ctas: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmation: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

interface IJourneryCofirmation {
  prefix: string;
  sufix: string;
  amount: number;
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
      <View style={styles.heading}>
        <AppText type="SUBTITLE" text={'Review configuration!'} />
      </View>
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
          highlightWord={amount + ''}
          sentence={getTextByLocale().overviewConfigurationAssumption(
            amount + '',
          )}
        />
      </View>
      <View style={styles.confirmation}>
        <View style={styles.ctas}>
          <AppText type="LABEL" text={'This is correct'} />
          <AppButton onPress={onValid} icon={faCheckCircle} />
        </View>
        <View style={styles.ctas}>
          <AppText type="LABEL" text={'Try again'} />
          <AppButton type="DANGER" onPress={onInvalid} icon={faTimesCircle} />
        </View>
      </View>
    </View>
  );
};

export default JourneyOverviewConfirmation;
