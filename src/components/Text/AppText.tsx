import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {DEFAULT_TEXT_COLOR, DEFAULT_TEXT_SIZE} from '../CONSTS';

interface AppText {
  text?: string;
}

const styles = StyleSheet.create({
  text: {
    color: DEFAULT_TEXT_COLOR,
    fontSize: DEFAULT_TEXT_SIZE,
  },
});

const AppText: React.FC<AppText> = ({text, children}): JSX.Element => {
  return <Text style={styles.text}>{children || text}</Text>;
};

export default AppText;
