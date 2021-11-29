import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome';

export interface I_AppIcon {
  icon: IconDefinition;
  size?: number;
  style?: FontAwesomeIconStyle;
  color: string;
}
