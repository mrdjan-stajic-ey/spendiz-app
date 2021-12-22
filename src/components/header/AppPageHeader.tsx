import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppDivider from '../divider/AppDivider';
import AppIcon from '../Icon/AppIcon';
import AppText from '../Text/AppText';

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 2,
  },
  contentTitle: {
    flex: 1,
  },
  menuHolder: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface IAppPageHeader {
  text: string;
  onCogClick?: () => void;
}

const PageAppHeader: React.FC<IAppPageHeader> = ({
  text,
  onCogClick,
}): JSX.Element => {
  const navigation = useNavigation();
  const _onCogHandler = () => {
    onCogClick && onCogClick();
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  return (
    <>
      <View style={styles.content}>
        <View style={styles.contentTitle}>
          <AppText type="TITLE" text={text} />
        </View>
        {/* <TouchableOpacity onPress={_onCogHandler} style={styles.menuHolder}>
          <AppIcon icon={faCogs} />
        </TouchableOpacity> */}
      </View>
      <AppDivider />
    </>
  );
};

export default PageAppHeader;
