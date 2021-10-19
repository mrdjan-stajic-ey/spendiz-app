import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faMusic,
  faPlaneSlash,
} from '@fortawesome/free-solid-svg-icons';
import {T_IconType} from '../CONSTS';

console.warn('TODO://Create font awesome library');

export interface I_ExpenesIconType {
  key: T_IconType;
  icon: IconDefinition;
}

const DEFAULT_ICON_MAPPING_TYPE: I_ExpenesIconType[] = [
  {
    key: 'FOOD',
    icon: faCoffee,
  },
  {
    key: 'ENTERTAINMENT',
    icon: faMusic,
  },
  {
    key: 'TRAVEL',
    icon: faPlaneSlash,
  },
];

export const getIconByType = (type: string): IconDefinition => {
  const result = DEFAULT_ICON_MAPPING_TYPE.find(
    k => k.key.toString() === type,
  )?.icon;
  return result || faCoffee;
};

export interface IExpenseType {
  type: string;
  amount: number;
  icon?: IconProp;
  displayName?: string;
  navigationHandler: () => void;
}
