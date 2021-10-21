import {NativeModules} from 'react-native';

export interface ISmsState {
  sender: string;
  body: string;
}

interface ISmsFetcher {
  getSmsInbox: () => Promise<ISmsState[]>;
}

const {SmsFetcher} = NativeModules;
const TypedSmsFetcher = SmsFetcher as ISmsFetcher;

export {TypedSmsFetcher};
