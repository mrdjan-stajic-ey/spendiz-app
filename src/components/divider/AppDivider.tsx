import {Divider} from 'native-base';
import React from 'react';
import {THIRD_BACKGROUND_COLOR} from '../CONSTS';

const AppDivider: React.FC<{}> = (): JSX.Element => (
  <Divider backgroundColor={THIRD_BACKGROUND_COLOR} />
);

export default AppDivider;
