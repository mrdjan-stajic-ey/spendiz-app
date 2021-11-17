import {TextProps} from 'react-native';
import {
  DEFAULT_HEADING_SIZE,
  DEFAULT_LABEL_TEXT_SIZE,
  DEFAULT_SUB_HEADER_SIZE,
  DEFAULT_TEXT_SIZE,
} from '../CONSTS';

export type TTextType = 'NORMAL' | 'TITLE' | 'SUBTITLE' | 'LABEL';
export interface IAppText extends TextProps {
  text?: string;
  type?: TTextType;
  link?: boolean;
  color?: string;
}
export const getTextStyleByType = (type?: TTextType) => {
  switch (type) {
    case 'NORMAL':
      return DEFAULT_TEXT_SIZE;
    case 'TITLE':
      return DEFAULT_HEADING_SIZE;
    case 'SUBTITLE':
      return DEFAULT_SUB_HEADER_SIZE;
    case 'LABEL':
      return DEFAULT_LABEL_TEXT_SIZE;
    default: {
      return DEFAULT_TEXT_SIZE;
    }
  }
};
