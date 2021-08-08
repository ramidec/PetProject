/* eslint-disable no-undef */
import {NativeModules} from 'react-native';

const mockAsyncStorage = require('@react-native-async-storage/async-storage/jest/async-storage-mock');
const mockImagePicker = (NativeModules.ImagePickerManager = {
  showImagePicker: jest.fn(),
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
});

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-vector-icons/EvilIcons', () => 'Icon');
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-image-picker', () => mockImagePicker);
