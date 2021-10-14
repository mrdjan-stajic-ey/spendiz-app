import {Button, IButtonProps} from 'native-base';
import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  BUTTON_DANGER,
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  BUTTON_TEXT_COLOR,
} from '../CONSTS';

type TButtonType = 'PRIMARY' | 'SECONDARY' | 'DANGER';

interface IAppButton extends IButtonProps {
  text: string;
  type?: TButtonType;
}

const style = StyleSheet.create({
  holder: {
    margin: 10,
    padding: 5,
    backgroundColor: BUTTON_PRIMARY,
  },
});

const getColorByType = (type?: TButtonType): string => {
  switch (type) {
    case 'DANGER':
      return BUTTON_DANGER;
    case 'PRIMARY':
      return BUTTON_PRIMARY;
    case 'SECONDARY':
      return BUTTON_SECONDARY;
    default:
      return BUTTON_PRIMARY;
  }
};

const AppButton: React.FC<IAppButton> = ({
  size,
  color,
  text,
  onPress,
  variant,
  type,
}): JSX.Element => {
  const buttonColor = useMemo(() => {
    return getColorByType(type);
  }, [type]);
  return (
    <Button
      variant={variant || 'solid'}
      style={[style.holder, {backgroundColor: buttonColor}]}
      onPress={onPress}
      size={size}
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

export default React.memo(AppButton);
