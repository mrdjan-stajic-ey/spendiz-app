import React, {useMemo} from 'react';
import {StyleSheet, Text, ViewProps} from 'react-native';
import {
  DEFAULT_HEADING_SIZE,
  DEFAULT_SUB_HEADER_SIZE,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_SIZE,
} from '../CONSTS';

type TTextType = 'NORMAL' | 'TITLE' | 'SUBTITLE';
interface AppText extends ViewProps {
  text?: string;
  type?: TTextType;
}

const styles = StyleSheet.create({
  text: {
    color: DEFAULT_TEXT_COLOR,
    fontSize: DEFAULT_TEXT_SIZE,
  },
});

const getTextStyleByType = (type?: TTextType) => {
  switch (type) {
    case 'NORMAL':
      return DEFAULT_TEXT_SIZE;
    case 'TITLE':
      return DEFAULT_HEADING_SIZE;
    case 'SUBTITLE':
      return DEFAULT_SUB_HEADER_SIZE;
    default: {
      return DEFAULT_TEXT_SIZE;
    }
  }
};

const AppText: React.FC<AppText> = ({text, type, style}): JSX.Element => {
  const font_size = useMemo(() => {
    return getTextStyleByType(type);
  }, [type]);
  return (
    <Text style={[styles.text, {fontSize: font_size}, style]}>{text}</Text>
  );
};

export default React.memo(AppText);
