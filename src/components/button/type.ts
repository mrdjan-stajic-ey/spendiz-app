import {IButtonProps} from 'native-base';
import {
  BUTTON_DANGER,
  BUTTON_DANGER_DISABLED,
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_DISABLED,
  BUTTON_SECONDARY,
  BUTTON_SECONDARY_DISABLED,
} from '../CONSTS';

export type TButtonType = 'PRIMARY' | 'SECONDARY' | 'DANGER';

export interface IAppButton extends IButtonProps {
  text: string;
  type?: TButtonType;
  onPress: () => Promise<any> | void | null;
}

export const getColorByType = (
  type?: TButtonType,
  isDisabled?: boolean,
): string => {
  switch (type) {
    case 'DANGER':
      return !isDisabled ? BUTTON_DANGER : BUTTON_DANGER_DISABLED;
    case 'PRIMARY':
      return isDisabled ? BUTTON_PRIMARY_DISABLED : BUTTON_PRIMARY;
    case 'SECONDARY':
      return !isDisabled ? BUTTON_SECONDARY : BUTTON_SECONDARY_DISABLED;
    default:
      return BUTTON_PRIMARY;
  }
};
