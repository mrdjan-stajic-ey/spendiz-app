import {ImageSourcePropType} from 'react-native';

export interface IBalanceOverviewItem {
  src: ImageSourcePropType;
  name?: string;
  onPress: () => void;
}
