import {NativeModules} from 'react-native';

export interface ISmsState {
  sender: string;
  body: string;
  id: string;
  date: string;
  date_sent: string;
}

interface ISmsFetcher {
  getSmsInbox: () => Promise<ISmsState[]>;
}

const {SmsFetcher} = NativeModules;
const TypedSmsFetcher = SmsFetcher as ISmsFetcher;

export {TypedSmsFetcher};
