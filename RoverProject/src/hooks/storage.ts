import {useCallback, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PetData, StorageKeys} from '../utils/const';
import {useAppContext} from './contexts';
import {ImageSourcePropType} from 'react-native';

type InputData = {
  name: string;
  description: string;
  petImage: ImageSourcePropType | (() => void) | undefined;
};

type ParsingProps = {
  data: InputData;
  id: string;
};

export const setInStorage = async (data: PetData[]) => {
  try {
    await AsyncStorage.setItem(StorageKeys.PET_DATA, JSON.stringify(data));
  } catch (e) {
    throw e;
  }
};

export const getDataFromStorage = async () => {
  let previousData: PetData[] = [];
  try {
    const storage = await AsyncStorage.getItem(StorageKeys.PET_DATA);
    if (storage) {
      previousData = JSON.parse(storage);
    }
  } catch (e) {
    throw e;
  }
  return previousData;
};

export const filterData = (storage: PetData[], itemId: string) => {
  const newData = storage.filter((pet: PetData) => pet.id !== itemId);
  return newData;
};

export const parsePetData = ({data, id}: ParsingProps) => {
  const parsedData = {
    name: data?.name,
    description: data?.description,
    petImage: data?.petImage,
    id,
  };
  return parsedData as PetData;
};

export const useDeleteItemFromStorage = () => {
  const {petData, setPetData} = useAppContext();

  const clearData = useCallback(
    (id: string) => {
      const newData = filterData(petData, id);
      setInStorage(newData);
      setPetData(newData);
      if (__DEV__) {
        const removedPet = petData.filter(pet => pet.id === id)[0];
        console.log(`Pet ${removedPet?.name} removed!`);
      }
    },
    [petData, setPetData],
  );

  return useMemo(() => [clearData], [clearData]);
};

export const useGetAsyncStorage = () => {
  return useCallback(async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      throw e;
    }
  }, []);
};

export const hasDuplicates = (arr: string[]) => {
  const set = new Set();
  arr.forEach(id => {
    set.add(id);
  });
  return set.size !== arr.length;
};

export const getIds = (arr: PetData[]) => {
  let idArr: string[] = [];
  arr.forEach(item => idArr.push(item?.id));
  return idArr;
};

export const createID = (arr: PetData[]) => {
  let id = String(arr.length);
  const idArray = getIds(arr);
  do {
    if (hasDuplicates(idArray)) {
      idArray.pop();
      id = addOneToString(id);
    }
    idArray.push(id);
  } while (hasDuplicates(idArray));
  return id;
};

const addOneToString = (id: string) => {
  const n = Number(id) + 1;
  return String(n);
};

export const useSetPetInAsyncStorage = () => {
  const {refetch} = useAppContext();
  const saveData = useCallback(
    async (data: InputData) => {
      const previousData = await getDataFromStorage();
      const currentData = parsePetData({
        data,
        id: createID(previousData),
      });
      const combinedData = previousData
        ? [...previousData, currentData]
        : [currentData];
      setInStorage(combinedData);
      refetch();
      if (__DEV__) {
        console.log(`Pet ${currentData.name} created!`);
      }
    },
    [refetch],
  );
  return useMemo(() => [saveData], [saveData]);
};
