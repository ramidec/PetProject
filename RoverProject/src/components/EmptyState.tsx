import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../components/Button';
import {colors} from '../utils/colors';
interface EmptyStateProps {
  text: string;
  onPress: () => void;
}
export const EmptyState: FunctionComponent<EmptyStateProps> = ({
  text,
  onPress,
}) => (
  <View style={styles.mainContainer}>
    <Text style={styles.title}>{text}</Text>
    <Button
      onPress={onPress}
      color={colors.darkGrey}
      style={styles.button}
      text="+ Add Your First Pet"
    />
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {textAlign: 'center', fontWeight: '500'},
  button: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: colors.grey,
    borderWidth: 2,
    width: 181,
    height: 44,
    backgroundColor: colors.white,
  },
});
