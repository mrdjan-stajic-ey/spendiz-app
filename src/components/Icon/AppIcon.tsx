import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {DEFAULT_ICON_SIZE} from '../CONSTS';
import {I_AppIcon} from './types';

const AppIcon: React.FC<I_AppIcon> = ({
  icon,
  size,
  style,
  color,
}): JSX.Element => {
  return (
    <FontAwesomeIcon
      size={size || DEFAULT_ICON_SIZE}
      icon={icon}
      color={color || 'white'}
      style={style}
    />
  );
};

export default AppIcon;
