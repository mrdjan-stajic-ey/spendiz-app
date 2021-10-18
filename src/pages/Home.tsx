import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import NotificationHandlerInstance from '../app-resources/notificationHandler';
import AppButton from '../components/button/AppButton';
import AppPage from '../components/page/AppPage';
import {TRootNavigation} from '../routing/BasicRouting';

type TExpensesProps = NativeStackScreenProps<TRootNavigation, 'Expenses'>;

const Home: React.FC<TExpensesProps> = ({navigation}): JSX.Element => {
  const handleTokenRegistration = async () => {
    try {
      const token = await NotificationHandlerInstance.getFCMToken();
      console.log('Token je', token);
    } catch (error) {
      console.log('Token fetching failed', error);
    }
  };
  const onBreakdownHandler = () => {
    navigation.navigate('Expenses');
  };
  return (
    <>
      <AppPage>
        <AppButton text="Hello" onPress={() => {}} />
        <AppButton text="Get token" onPress={handleTokenRegistration} />
        <AppButton text="Chart and breakdown" onPress={onBreakdownHandler} />
        <AppButton text="Categories" />
        <AppButton text="SMS Handler" />
      </AppPage>
    </>
  );
};

export default Home;
