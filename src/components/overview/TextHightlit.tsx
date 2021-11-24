import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../Text/AppText';
import {ITextHighlit, ITextHighlitStyles} from './type';

const styles = StyleSheet.create({
  content: {
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
          <AppText
            type="LABEL"
            key={t + index}
            text={`${t} `}
            style={[
              highlightWord === t
                ? {...styles.hightlitStyle, ...hightlitStyle}
                : {},
            ]}
          />
        );
      })}
    </View>
  );
};

export default TextHighlit;
