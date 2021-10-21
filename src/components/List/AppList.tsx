import {FlatList, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IAppListProps} from './type';

const styles = StyleSheet.create({
  listHolder: {
    padding: 5,
  },
  listContent: {
    marginRight: 15,
  },
});

const AppList: React.FC<IAppListProps> = ({
  data,
  keyExtractor,
  renderItem,
}): JSX.Element => {
  return (
    <View style={styles.listHolder}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default AppList;
