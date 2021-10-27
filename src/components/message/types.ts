import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TConfigurationNavigation} from '../../routing/types';

export type T_Parser_Props = NativeStackScreenProps<
  TConfigurationNavigation,
  'Parser'
>;

export type PhrasePart = {
  id: string;
  text: string;
  selected?: boolean;
};

export interface IMessagePhraseSelector {
  body: string;
  id: string;
  date: string;
  sender: string;
  onContinue: () => void;
}
