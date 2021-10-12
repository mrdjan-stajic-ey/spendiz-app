import React from 'react';
import {Button, Card} from 'react-native-elements';

const Home: React.FC<{}> = (): JSX.Element => {
  return (
    <>
      <Card>
        <Card.Title>Home screen</Card.Title>
        <Button title="Hello" />
      </Card>
    </>
  );
};

export default Home;
