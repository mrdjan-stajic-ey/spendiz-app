import React from 'react';
import {View} from 'react-native';
import AppText from '../Text/AppText';
import {IExpenseItemV2} from './typesv2';

const ExpensePreview: React.FC<IExpenseItemV2> = (): JSX.Element => {
  return (
    <View>
      <AppText text="Expnse preview" />
    </View>
  );
};

export default ExpensePreview;
