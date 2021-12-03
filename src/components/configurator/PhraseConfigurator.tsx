import React, {useContext, useState} from 'react';
import {View, StyleSheet, Switch, ScrollView} from 'react-native';
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
import CategoryExpenseItem from './expense/CategoryExpenseItem';

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
  transactionTypeHeader: {
    marginBottom: 5,
    marginTop: 5,
  },
  transactionTypeLabel: {
    marginBottom: 5,
  },
});
const PhraseConfigurator: React.FC<{}> = (): JSX.Element => {
  const {
    categories,
    toggleCategorySelection,
    transactionType,
    setTransactionType,
  } = useContext(PhrasesContext);

  const [isSubtract, setIsSubtractAction] = useState<boolean>(
    transactionType === 'OUTBOUND' ? true : false,
  );

  const toggleSwitchHandler = (value: boolean) => {
    setIsSubtractAction(value);
    setTransactionType(value ? 'OUTBOUND' : 'INBOUND');
  };
  return (
    <View style={styles.holder}>
      <AppText
        type="SUBTITLE"
        text={getTextByLocale().phraseConfigurationDescription}
      />
      <View style={styles.controls}>
        <AppText
          style={styles.transactionTypeLabel}
          type="LABEL"
          text={getTextByLocale().phraseBalanceActionLabel}
        />
        <View style={styles.toggleAction}>
          <AppText type="LABEL" text={getTextByLocale().categoryInfluenceAdd} />
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
          <AppText
            type="LABEL"
            text={getTextByLocale().categoryInfluenceSubtract}
          />
        </View>
        <AppDivider />
        <AppText
          style={styles.transactionTypeHeader}
          text={getTextByLocale().phraseBankAccTypeLabel}
          type="LABEL"
        />
      </View>
      <ScrollView>
        <View style={styles.balanceType}>
          {categories.length > 0 &&
            categories.map(t => (
              <CategoryExpenseItem
                id={t.id}
                key={t._id}
                _id={t._id}
                description={t.description}
                name={t.name}
                selected={t.selected || false}
                onPress={toggleCategorySelection}
              />
            ))}
          {categories.length === 0 && (
            <View>
              <AppText
                text={getTextByLocale().noCategoriesMessage}
                type="SUBTITLE"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PhraseConfigurator;
