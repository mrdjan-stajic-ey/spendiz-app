import {Button} from 'native-base';
import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {BUTTON_TEXT_COLOR} from '../CONSTS';
import {getColorByType, IAppButton} from './type';

const style = StyleSheet.create({
  holder: {
    margin: 10,
    padding: 5,
  },
});
const AppButton: React.FC<IAppButton> = ({
  size,
  color,
  text,
  onPress,
  variant,
  type,
  borderRadius,
}): JSX.Element => {
  const buttonColor = useMemo(() => {
    console.warn('//TODO: Button color must be tied to variant type;');
    if (variant !== 'outline' || variant !== 'ghost') {
      return getColorByType(type);
    }
  }, [type, variant]);
  return (
    <Button
      variant={variant ? variant : 'solid'}
      borderRadius={borderRadius}
      style={[style.holder, {backgroundColor: buttonColor || ''}]}
      onPress={onPress}
      size={size}
      _pressed={{
        opacity: 0.5,
      }}
      color={color}>
      <Text
        style={{
          color: BUTTON_TEXT_COLOR,
        }}>
        {text}
      </Text>
    </Button>
  );
};

export default AppButton;
