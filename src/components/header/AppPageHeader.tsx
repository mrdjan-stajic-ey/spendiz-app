import {Center} from 'native-base';
import React from 'react';
import AppDivider from '../divider/AppDivider';
import AppText from '../Text/AppText';

interface IAppPageHeader {
  text: string;
}

const PageAppHeader: React.FC<IAppPageHeader> = ({text}): JSX.Element => {
  return (
    <Center marginBottom={0}>
      <AppText type="TITLE" text={text} />
      <AppDivider />
    </Center>
  );
};

export default PageAppHeader;
