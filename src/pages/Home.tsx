import React from 'react';
import NotificationHandlerInstance from '../app-resources/notificationHandler';
import AppButton from '../components/button/AppButton';
import AppPage from '../components/page/AppPage';

const Home: React.FC<{}> = (): JSX.Element => {
  const handleTokenRegistration = async () => {
    try {
      const token = await NotificationHandlerInstance.getFCMToken();
      console.log('Token je', token);
    } catch (error) {
      console.log('Token fetching failed', error);
    }
  };
  return (
    <>
      <AppPage>
        <AppButton text="Hello" onPress={() => {}} />
        <AppButton text="Get token" onPress={handleTokenRegistration} />
      </AppPage>
    </>
  );
};

export default Home;
