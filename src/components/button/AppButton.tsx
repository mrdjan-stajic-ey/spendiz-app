import {Button} from 'native-base';
import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {BUTTON_TEXT_COLOR} from '../CONSTS';
import AppText from '../Text/AppText';
import {getColorByType, IAppButton} from './type';

const style = StyleSheet.create({
  holder: {
    display: 'flex',
    margin: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    color: BUTTON_TEXT_COLOR,
    fontWeight: '600',
    fontSize: 15,
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
  disableAsyncBehaviour = false,
}): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState(disabled);

  const buttonColor = useMemo(() => {
    // console.warn('//TODO: Button color must be tied to variant type;'); //TODO Sredi boje za disabled;
    if (variant !== 'outline' || variant !== 'ghost') {
      return getColorByType(type, isDisabled || false);
    }
  }, [type, variant, isDisabled]);

  //se comments for syncPressHandler;
  const asyncPressHandler = () => {
    if (onPress) {
      const _f = onPress();
      if (_f?.then) {
        setIsDisabled(true);
      }
      _f?.then(() => {
        setIsDisabled(false);
      });
      _f?.catch(() => {
        setIsDisabled(false);
      });
    }
  };
  //15.11.2021
  //Since there can be navigation that will remove the screen from the navigation options,
  //disable and enable of the button can it can  cause 'cannot update state on unmounted component'
  // "fix" (read. Hack is to manualy disable that on the buttons that navigate off the screen) bug found when the navigation was spilt into Auth and App navigation;
  const syncPressHandler = () => {
    onPress();
  };

  return (
    <Button
      disabled={isDisabled}
      variant={variant ? variant : 'solid'}
      borderRadius={borderRadius || 50}
      style={[style.holder, {backgroundColor: buttonColor || ''}]}
      onPress={disableAsyncBehaviour ? syncPressHandler : asyncPressHandler}
      size={size}
      _pressed={{
        opacity: 0.5,
      }}
      color={color}>
      <AppText text={text} style={style.textContent} />
    </Button>
  );
};

export default AppButton;
