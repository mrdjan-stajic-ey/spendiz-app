import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/button/AppButton';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';
import PhrasesContext from '../../data-management/PhraseContext';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  balanceType: {
    flex: 1,
  },
});

const OverviewPage: React.FC<{}> = (): JSX.Element => {
  const {phrases, categories} = useContext(PhrasesContext);
  return (
    <AppPage>
      <View style={styles.content}>
        <AppText type="TITLE" text={'Overview page'} />
        <AppText
          text={
            'You have chosen the following phrases to manage your balance amount'
          }
        />
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={styles.balanceType}>
              {phrases.map(p => {
                return <Text> {p.text} </Text>;
              })}
            </View>
          </ScrollView>
        </View>
        <AppText text={'And they are asociated with categories:'} />
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={styles.balanceType}>
              {categories.map(p => {
                return <Text> {p} </Text>;
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
