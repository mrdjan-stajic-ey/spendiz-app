import {IScrollViewProps} from 'native-base';

export interface IAppScrollableViewProps extends Partial<IScrollViewProps> {}

export const DEFAULT_SCROLLVIEW_STYLES: IScrollViewProps = {
  mb: '4',
  minW: '72',
  flexDirection: 'row',
  flexGrow: 1,
};
