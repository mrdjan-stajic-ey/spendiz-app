import React from 'react';
import {Button, Card} from 'react-native-elements';
import NotificationHandlerInstance from '../app-resources/notificationHanler';

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
      <Card>
        <Card.Title>Home screen</Card.Title>
        <Button title="Hello" />
        <Button title="Get token" onPress={handleTokenRegistration} />
      </Card>
    </>
  );
};

export default Home;
