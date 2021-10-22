import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {tokenize} from '../../utils/main';
import PillButton from '../pill/Pill';

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    flex: 1,
  },
  pillScrollViewContent: {
    flex: 4,
    marginBottom: 10,
    padding: 5,
  },
  pillContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  nextStepHolder: {
    flex: 1,
  },
});
//getting ID and date since i have no chance of generating some bullet proof ids of array elements;
const MessageContent: React.FC<{
  body: string;
  id: string;
  date: string;
  sender: string;
}> = ({body}): JSX.Element => {
  const bodyParts: string[] = tokenize(body);
  return (
    <View style={styles.content}>
      <View style={styles.pillScrollViewContent}>
        <ScrollView>
          <View style={styles.pillContent}>
            {bodyParts.map(stringPart => {
              return <PillButton text={stringPart} />;
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.nextStepHolder}>
        <Text>AAAAAAAA</Text>
      </View>
    </View>
  );
};

export default MessageContent;
