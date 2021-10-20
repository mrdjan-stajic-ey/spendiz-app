import React from 'react';
import AppPage from '../../components/page/AppPage';
import AppText from '../../components/Text/AppText';

const AccountSettings: React.FC<{}> = (): JSX.Element => {
  return (
    <AppPage>
      <AppText text="Application settings will be here" />
    </AppPage>
  );
};

export default AccountSettings;
