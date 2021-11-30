import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../Text/AppText';
import {ITextHighlit, ITextHighlitStyles} from './type';

const styles = StyleSheet.create({
  content: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
  },
  hightlitStyle: {
    color: 'red',
  },
});

const TextHighlit: React.FC<ITextHighlit & ITextHighlitStyles> = ({
  sentence,
  highlightWord,
  hightlitStyle,
}): JSX.Element => {
  const texts: string[] = sentence.split(' ');
  return (
    <View style={styles.content}>
      {texts.map((t, index) => {
        return (
          <View key={t + index}>
            <AppText
              numberOfLines={2}
              ellipsizeMode={'head'}
              type="LABEL"
              text={`${t} `}
              style={[
                highlightWord === t
                  ? {...styles.hightlitStyle, ...hightlitStyle}
                  : {},
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

export default TextHighlit;
