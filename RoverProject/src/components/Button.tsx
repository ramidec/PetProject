/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {colors} from '../utils/colors';

interface ButtonProps {
  text: string;
  color?: string;
  style?: ViewStyle;
  onPress: () => void;
  showBorder?: boolean;
  textStyle?: TextStyle;
  disabled?: boolean;
}
export const Button: FunctionComponent<ButtonProps> = ({
  style,
  text,
  color,
  onPress = () => {},
  showBorder = true,
  textStyle,
  disabled,
}) => (
  <TouchableOpacity
    onPress={() => {
      if (!disabled) {
        onPress();
      }
    }}
    activeOpacity={!disabled ? 0 : 1}
    style={[
      showBorder && {
        borderWidth: 1,
        borderColor: disabled ? colors.grey : color || colors.black,
      },
      style,
    ]}>
    <Text
      style={[
        {color: disabled ? colors.grey : color || colors.black, padding: 5},
        textStyle,
      ]}>
      {text}
    </Text>
  </TouchableOpacity>
);
