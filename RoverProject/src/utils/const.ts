/* eslint-disable no-shadow */
import {ImageSourcePropType} from 'react-native';

export enum StorageKeys {
  PET_DATA = '@pet_data',
}

export const navigationKeys = {
  HOME: 'Home',
  CREATE_PET: 'CreatePet',
};

export const ID_TO_DELETE = '0';

export type PetData = {
  name: string;
  description: string;
  petImage?: ImageSourcePropType;
  id: string;
};

export const mockedDog = {
  name: 'Doggy',
  description: 'Doggy description',
  petImage: undefined,
  id: ID_TO_DELETE,
};

export const mockedCat = {
  name: 'Catty',
  description: 'Catty description',
  petImage: undefined,
  id: '2',
};

export const mockedInputData = {
  name: 'Mr. Pet',
  description: 'Woof woof',
  petImage: undefined,
};

export const mockedPetArray = [mockedDog, mockedCat];
