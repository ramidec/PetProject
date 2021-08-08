import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import {colors} from '../utils/colors';
import {useSetPetInAsyncStorage} from '../hooks/storage';
import {useGalleryFiles} from '../hooks/gallery';
import {titles} from '../utils/';

export const CreatePet = ({navigation}: NativeStackScreenProps<{}>) => {
  const [petName, setPetName] = useState<string>('');
  const [petDescription, setPetDescription] = useState<string>('');
  const [saveData] = useSetPetInAsyncStorage();
  const onNameTextChange = useCallback(t => setPetName(t), []);
  const onDescriptionTextChange = useCallback(t => setPetDescription(t), []);

  const [openGallery, imageUri] = useGalleryFiles({
    mediaType: 'photo',
    maxHeight: 390,
    maxWidth: 844,
  });

  const inputData = [
    {
      title: titles.nameInputTitle,
      onTextChange: onNameTextChange,
      placeholder: titles.namePlaceholderText,
    },
    {
      title: titles.descriptionInputTitle,
      onTextChange: onDescriptionTextChange,
      style: {marginTop: 20},
      inputStyle: {height: 125, textAlignVertical: 'top'},
      multiline: true,
      placeholder: titles.descriptionPlaceholderText,
    },
  ];

  const dismissKeyboard = useCallback(() => Keyboard.dismiss(), []);

  const onSubmit = useCallback(() => {
    saveData({
      name: petName,
      description: petDescription,
      petImage: imageUri,
    }).then(() => navigation.goBack());
  }, [navigation, petDescription, imageUri, petName, saveData]);

  return (
    <SafeAreaView style={styles.background}>
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.absoluteFill}
        onPress={dismissKeyboard}>
        <View style={styles.topContainer}>
          {imageUri && (
            <Image
              resizeMode="contain"
              source={imageUri as ImageSourcePropType}
              style={styles.image}
            />
          )}
          <Button
            text={imageUri ? '+' : '+ Upload Photo'}
            color={imageUri ? colors.white : colors.darkGrey}
            style={imageUri ? styles.overlayButton : styles.button}
            onPress={openGallery as () => void}
          />
        </View>
        <View style={styles.inputs}>
          {inputData.map(item => (
            <Input
              onSubmit={dismissKeyboard}
              title={item.title}
              onTextChange={item.onTextChange}
              style={item?.style}
              inputStyle={item?.inputStyle}
              key={item.title}
              multiline={item?.multiline}
              placeholder={item?.placeholder}
            />
          ))}
        </View>
        <Button
          disabled={!petName || !petDescription}
          textStyle={styles.submitButtonText}
          text={titles.submitButtonText}
          color={colors.green}
          style={styles.submitButtom}
          onPress={onSubmit}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {flex: 1, width: '100%'},
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundGrey,
  },
  submitButtonText: {fontWeight: '700', fontSize: 18},
  submitButtom: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 2,
    width: '90%',
    minHeight: '7.5%',
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: colors.grey,
    borderWidth: 2,
    width: '40%',
    height: '30%',
    backgroundColor: colors.white,
  },
  overlayButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.green,
    borderRadius: 30,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    flex: 3,
    backgroundColor: colors.white,
    paddingTop: 28,
    alignItems: 'center',
  },
});
