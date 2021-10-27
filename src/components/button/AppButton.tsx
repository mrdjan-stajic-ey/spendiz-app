import {Button} from 'native-base';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {BUTTON_TEXT_COLOR} from '../CONSTS';
import AppText from '../Text/AppText';
import {getColorByType, IAppButton} from './type';

const style = StyleSheet.create({
  holder: {
    margin: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const AppButton: React.FC<IAppButton> = ({
  size,
  color,
  text,
  onPress,
  variant,
  disabled,
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
      disabled={disabled}
      variant={variant ? variant : 'solid'}
      borderRadius={borderRadius}
      style={[style.holder, {backgroundColor: buttonColor || ''}]}
      onPress={onPress}
      size={size}
      _pressed={{
        opacity: 0.5,
      }}
      color={color}>
      <AppText
        text={text}
        style={{
          color: BUTTON_TEXT_COLOR,
        }}
      />
    </Button>
  );
};

export default AppButton;
