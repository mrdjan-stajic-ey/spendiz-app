import {FlatList, View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {IAppListProps} from './type';
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  listHolder: {
    padding: 10,
  },
  listContent: {
    maxWidth: width - 40, //Le magical number
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
