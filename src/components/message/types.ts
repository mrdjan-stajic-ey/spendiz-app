import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MessageDataParserMode} from '../../pages/account-settings/types';
import {TConfigurationNavigation} from '../../routing/types';

export type T_Parser_Props = NativeStackScreenProps<
  TConfigurationNavigation,
  'Parser'
>;

export type PhrasePart = {
  id: string;
  text: string;
  selected?: boolean;
  isSufixAfixPart?: boolean;
};

export interface Category {
  name: string;
  description: string;
  _id: string;
  id: string;
  selected?: boolean;
}

export interface IMessagePhraseSelector {
  body: string;
  phase: MessageDataParserMode;
  id: string;
  date: string;
  sender: string;
  onContinue: () => void;
}
