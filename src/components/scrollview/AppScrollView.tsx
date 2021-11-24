import {ScrollView} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppDivider from '../divider/AppDivider';
import AppText from '../Text/AppText';
import {TTextType} from '../Text/type';

interface IScrollView {
  fitContent?: boolean;
  heading?: {
    type: TTextType;
    text: string;
  };
  horizontal?: boolean;
  [key: string]: any;
}

interface IScrollViewStyles {
  contentHolder?: {
    flex: number;
    marginTop: number;
    marginBottom: number;
  };
  viewContent?: {
    flex: number;
  };
  fitContent?: {};
  [key: string]: any;
}

const styles = StyleSheet.create<IScrollViewStyles>({
  contentHolder: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  fitContent: {marginTop: 5, marginBottom: 5},
  viewContent: {flex: 1},
});

const AppScrollView: React.FC<IScrollView & IScrollViewStyles> = ({
  children,
  heading,
  horizontal,
  contentHolder,
  viewContent,
  fitContent,
}): JSX.Element => {
  return (
    <View
      style={[
        fitContent ? styles.fitContent : styles.contentHolder,
        contentHolder,
      ]}>
      {heading && (
        <>
          <AppText type={heading.type} text={heading.text} />
          <AppDivider />
        </>
      )}
      <ScrollView horizontal={horizontal}>
        <View style={[styles.viewContent, viewContent]}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default AppScrollView;
