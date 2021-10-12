import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';

interface I_AppIcon {
  icon: IconProp;
}

const AppIcon: React.FC<I_AppIcon> = ({icon}): JSX.Element => {
  return <FontAwesomeIcon icon={icon} />;
};

export default AppIcon;
