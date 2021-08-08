/**
 * @format
 */

import 'react-native';
import React from 'react';
import {create} from 'react-test-renderer';
import {Home} from '../src/screens/Home';
import {AppContext, Context} from '../src/context/context';
import {CreatePet} from '../src/screens/CreatePet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {
  createID,
  filterData,
  getDataFromStorage,
  getIds,
  hasDuplicates,
  parsePetData,
  setInStorage,
} from '../src/hooks/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ID_TO_DELETE,
  mockedDog,
  mockedInputData,
  mockedPetArray,
  PetData,
} from '../src/utils/const';

beforeEach(async () => {
  await AsyncStorage.clear();
});

const contextMock: Context = {
  petData: [],
  setPetData: () => {},
  hasChangedState: false,
  setHasChangedState: () => {},
  refetch: () => {},
};
let navigationMock;
let routeMock;

const homeTree = create(
  <AppContext.Provider value={contextMock}>
    <Home
      navigation={navigationMock as unknown as NativeStackNavigationProp<{}>}
      route={routeMock as unknown as RouteProp<{}>}
    />
  </AppContext.Provider>,
);
const createPetTree = create(
  <AppContext.Provider value={contextMock}>
    <CreatePet
      navigation={navigationMock as unknown as NativeStackNavigationProp<{}>}
      route={routeMock as unknown as RouteProp<{}>}
    />
  </AppContext.Provider>,
);

describe('screenshots', () => {
  test('home screen snapshot', () => {
    expect(homeTree).toMatchSnapshot();
  });

  test('createPet screen snapshot', () => {
    expect(createPetTree).toMatchSnapshot();
  });
});

describe('test async storage methods', () => {
  test('if no results exist, return an empty array', async () => {
    const result = await getDataFromStorage();
    expect(result).toEqual([]);
  });

  test('if you create a new pet, a unique id is generated for it', async () => {
    let newArray = [...(mockedPetArray as PetData[])];
    const newPet = parsePetData({
      data: mockedInputData,
      id: createID(mockedPetArray),
    });
    newArray.push(newPet as PetData);
    expect(newPet.id).not.toMatch(mockedPetArray[0].id);
    expect(newPet.id).not.toMatch(mockedPetArray[1].id);
    expect(hasDuplicates(getIds(newArray))).toBeFalsy();
  });

  test('if a result was saved, return array with it', async () => {
    setInStorage([mockedDog] as unknown as PetData[]);
    const result = await getDataFromStorage();
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockedDog);
  });

  test('if one result is deleted, return updated array', async () => {
    setInStorage(mockedPetArray as unknown as PetData[]);

    const storage = await getDataFromStorage();
    const filteredData = filterData(storage, ID_TO_DELETE);

    setInStorage(filteredData as unknown as PetData[]);

    const filteredStorage = await getDataFromStorage();

    expect(filteredStorage).toHaveLength(1);
    expect(filteredStorage[0]).toEqual(mockedPetArray[1]);
  });
});
