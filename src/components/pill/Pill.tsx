import React, {useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {BUTTON_PRIMARY} from '../CONSTS';
import {IPillButton} from './type';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    padding: 12,
    borderRadius: 50,
    backgroundColor: BUTTON_PRIMARY,
    marginRight: 10,
    width: windowWidth / 4 - 25, //paddingz
    marginBottom: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
});
console.log('TODO: Align this to the other buttons');
const PillButton: React.FC<IPillButton> = ({text}): JSX.Element => {
  const ref = useRef(null);
  const handlePillOnPress = () => {
    if (!ref) {
      return;
    }
    if (ref && ref.current) {
      //@ts-ignore
      ref.current.setNativeProps({
        // transform(sc), https://iwritecodesometimes.net/2019/04/17/react-native-scale-on-press-animations-made-easy/
      });
    }
  };
  return (
    <TouchableOpacity style={styles.content} onPress={handlePillOnPress}>
      <View>
        <Text
          ref={ref}
          style={styles.text}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PillButton;
