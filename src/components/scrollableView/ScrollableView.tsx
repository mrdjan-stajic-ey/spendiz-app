import {ScrollView} from 'native-base';
import React from 'react';
import {IAppScrollableViewProps} from './type';

const AppScrollableView: React.FC<IAppScrollableViewProps> = ({
  horizontal,
  children,
  _contentContainerStyle,
}): JSX.Element => {
  return (
    <ScrollView
      _contentContainerStyle={_contentContainerStyle}
      horizontal={horizontal}>
      {children}
    </ScrollView>
  );
};

export default AppScrollableView;
