import React, {FunctionComponent} from 'react';
import {IconProps as VectorIconProps} from 'react-native-vector-icons/Icon';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {View, ViewStyle} from 'react-native';

interface IconProps {
  type: 'MaterialIcons' | 'MaterialCommunityIcons' | 'Feather' | 'EvilIcons';
  name: string;
  size?: number;
  style?: ViewStyle;
}

export const Icon: FunctionComponent<IconProps> = ({
  type,
  name,
  size,
  style,
}) => {
  const props: VectorIconProps = {
    size: size || 30,
    name,
  };
  let contained;
  switch (type) {
    case 'MaterialIcons':
      contained = <MaterialIcon {...props} />;
      break;
    case 'MaterialCommunityIcons':
      contained = <MaterialCommunityIcons {...props} />;
      break;
    case 'Feather':
      contained = <Feather {...props} />;
      break;
    case 'EvilIcons':
      contained = <EvilIcons {...props} />;
      break;
  }
  return <View style={style}>{contained}</View>;
};
