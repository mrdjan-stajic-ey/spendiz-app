import {Divider} from 'native-base';
import React from 'react';
import {THIRD_BACKGROUND_COLOR} from '../CONSTS';

interface IAppDivider {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  margin?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  padding?: number;
  color?: string;
}

const AppDivider: React.FC<IAppDivider> = ({
  margin,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  color,
}): JSX.Element => {
  return (
    <Divider
      //   display={'none'}
      marginBottom={marginBottom || null}
      marginTop={marginTop || null}
      margin={margin || null}
      padding={padding || null}
      paddingBottom={paddingBottom || null}
      paddingLeft={paddingLeft || null}
      paddingRight={paddingRight || null}
      paddingTop={paddingTop || null}
      marginLeft={marginLeft || null}
      marginRight={marginRight || null}
      backgroundColor={color ? color : THIRD_BACKGROUND_COLOR}
    />
  );
};

export default AppDivider;
