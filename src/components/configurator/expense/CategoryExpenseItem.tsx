import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppIcon from '../../Icon/AppIcon';
import {Category} from '../../message/types';
import AppText from '../../Text/AppText';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import AppDivider from '../../divider/AppDivider';
const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingBottom: 0,
  },
  categoryInfo: {
    flex: 1,
  },
  checkmark: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

interface ExpanseCategory extends Category {
  selected: boolean;
  onPress: (categoryId: string) => any;
}
const CategoryExpenseItem: React.FC<ExpanseCategory> = ({
  description,
  _id,
  name,
  selected,
  onPress,
}): JSX.Element => {
  const onPressHandlerEvent = () => {
    onPress(_id);
  };

  return (
    <TouchableOpacity
      onPress={onPressHandlerEvent}
      key={_id}
      style={[styles.content]}>
      <View style={styles.categoryInfo}>
        <AppText type="NORMAL" text={name} />
        <AppText type="NORMAL" text={description} />
        <AppDivider />
      </View>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={[styles.checkmark, {opacity: selected ? 1 : 0}]}>
        <AppIcon icon={faCheck} />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryExpenseItem;
