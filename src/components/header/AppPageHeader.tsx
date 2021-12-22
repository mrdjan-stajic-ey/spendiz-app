import React from 'react';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LOG_ERROR, LOG_TO_BACKEND} from '../../http/axios-wrapper';
import {BUTTON_PRIMARY} from '../CONSTS';
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
    marginBottom: 5,
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BUTTON_PRIMARY,
    borderRadius: 50,
  },
});

type TTextSize = 'NORMAL' | 'SMALL';
interface IAppPageHeader {
  text: string;
  onCogClick?: () => void;
  textOnly?: boolean;
  textSize?: TTextSize;
}

const PageAppHeader: React.FC<IAppPageHeader> = ({
  text,
  onCogClick,
  textOnly = false,
  textSize = 'NORMAL',
}): JSX.Element => {
  const navigation = useNavigation();
  const _onCogHandler = () => {
    onCogClick && onCogClick();
    try {
      navigation.dispatch(DrawerActions.toggleDrawer());
    } catch (error) {
      LOG_ERROR('Failed drawer navigation navigation', {});
    }
  };

  return (
    <>
      <View style={styles.content}>
        <View
          style={[styles.contentTitle, textOnly ? {alignItems: 'center'} : {}]}>
          <AppText
            type={textSize === 'NORMAL' ? 'TITLE' : 'SUBTITLE'}
            text={text}
          />
        </View>
        {!textOnly && (
          <TouchableOpacity onPress={_onCogHandler} style={styles.menuHolder}>
            <AppIcon icon={faUser} />
          </TouchableOpacity>
        )}
      </View>
      <AppDivider />
    </>
  );
};

export default PageAppHeader;
