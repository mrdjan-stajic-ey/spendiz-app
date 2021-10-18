import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {DEFAULT_ICON_SIZE} from '../CONSTS';

interface I_AppIcon {
  icon: IconDefinition;
  size?: number;
  style?: FontAwesomeIconStyle;
}

const AppIcon: React.FC<I_AppIcon> = ({icon, size, style}): JSX.Element => {
  return (
    <FontAwesomeIcon
      size={size || DEFAULT_ICON_SIZE}
      icon={icon}
      color="white"
      style={style}
    />
  );
};

export default AppIcon;
