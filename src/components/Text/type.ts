import {ViewProps} from 'react-native';
import {
  DEFAULT_HEADING_SIZE,
  DEFAULT_SUB_HEADER_SIZE,
  DEFAULT_TEXT_SIZE,
} from '../CONSTS';

export type TTextType = 'NORMAL' | 'TITLE' | 'SUBTITLE';
export interface IAppText extends ViewProps {
  text?: string;
  type?: TTextType;
}
export const getTextStyleByType = (type?: TTextType) => {
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
