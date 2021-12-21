import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View} from 'react-native';

const OptionsDrawerNavigation = createDrawerNavigator();

const ProfileOP: React.FC<{}> = ({
  navigation,
}: {
  [key: string]: any;
}): JSX.Element => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

const TemplatesOp: React.FC<{}> = ({
  navigation,
}: {
  [key: string]: any;
}): JSX.Element => {
  return (
    <View>
      <Text>Templates</Text>
    </View>
  );
};

const OptionsDrawer: React.FC<{}> = (): JSX.Element => {
  return (
    <OptionsDrawerNavigation.Navigator initialRouteName="App">
      <OptionsDrawerNavigation.Screen name="Profile" component={ProfileOP} />
      <OptionsDrawerNavigation.Screen
        name="Templates"
        component={TemplatesOp}
      />
    </OptionsDrawerNavigation.Navigator>
  );
};

export default OptionsDrawer;
