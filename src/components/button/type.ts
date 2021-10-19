import {IButtonProps} from 'native-base';
import {BUTTON_DANGER, BUTTON_PRIMARY, BUTTON_SECONDARY} from '../CONSTS';

export type TButtonType = 'PRIMARY' | 'SECONDARY' | 'DANGER';

export interface IAppButton extends IButtonProps {
  text: string;
  type?: TButtonType;
}

export const getColorByType = (type?: TButtonType): string => {
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
