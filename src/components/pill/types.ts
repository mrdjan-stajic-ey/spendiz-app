import {IAppButton} from '../button/type';

export interface PillAppButton extends IAppButton {
  onSelect?: (item: any) => any;
  selected: boolean;
  data?: any;
}
