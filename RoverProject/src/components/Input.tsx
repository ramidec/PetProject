import React, {FunctionComponent} from 'react';
import {View, Text, TextInput, ViewStyle, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';

interface InputProps {
  onTextChange: (text: string) => void;
  title: string;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  multiline?: boolean;
  placeholder?: string;
  onSubmit?: () => void;
}

export const Input: FunctionComponent<InputProps> = ({
  onTextChange,
  title,
  style,
  inputStyle,
  multiline,
  placeholder = '',
  onSubmit,
}) => (
  <View style={[styles.container, style]}>
    <Text style={styles.title}>{title}</Text>
    <TextInput
      autoCorrect={false}
      blurOnSubmit={true}
      onSubmitEditing={onSubmit}
      returnKeyType="done"
      multiline={multiline}
      placeholder={placeholder}
      style={[styles.input, inputStyle]}
      onChangeText={onTextChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {fontWeight: '700', fontSize: 17, alignSelf: 'flex-start'},
  input: {
    marginTop: 10,
    padding: 10,
    width: '100%',
    height: 50,
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 6,
  },
});
