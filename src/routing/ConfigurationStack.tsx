import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PhraseWizard from '../data-management/PhraseWizard';
import MessageParser from '../pages/account-settings/MessageDataParser';
import OverviewPage from '../pages/account-settings/Overview';
import PhraseConfiguration from '../pages/account-settings/PhraseConfiguration';
import {TConfigurationNavigation} from './types';

const ConfigurationStack = createStackNavigator<TConfigurationNavigation>();

const AppConfigurationRoutes = () => {
  return (
    <PhraseWizard>
      <ConfigurationStack.Navigator
        initialRouteName="Parser"
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        <ConfigurationStack.Screen name="Parser" component={MessageParser} />
        <ConfigurationStack.Screen
          name="Phrase"
          component={PhraseConfiguration}
        />
        <ConfigurationStack.Screen name="Overview" component={OverviewPage} />
      </ConfigurationStack.Navigator>
    </PhraseWizard>
  );
};

export default AppConfigurationRoutes;
