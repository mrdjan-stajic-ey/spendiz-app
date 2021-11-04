import {Center} from 'native-base';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {IOverviewInfoItem} from './types';

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#b0b0b0',
    borderRadius: 50,
    marginBottom: 5,
  },
});

const OverviewInfoItem: React.FC<IOverviewInfoItem> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  content,
  onPress,
  children,
}): JSX.Element => {
  const handlePress = () => {
    onPress && onPress();
  };
  return (
    <TouchableWithoutFeedback style={styles.content} onPress={handlePress}>
      <Center>
        <Text>{children}</Text>
      </Center>
    </TouchableWithoutFeedback>
  );
};

export default OverviewInfoItem;
