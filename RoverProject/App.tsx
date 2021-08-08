import 'react-native-gesture-handler';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './src/screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreatePet} from './src/screens/CreatePet';
import {colors} from './src/utils/colors';
import {Button} from './src/components/Button';
import {navigationRef, navigate} from './src/utils/RootNavigation';
import {navigationKeys, PetData, StorageKeys} from './src/utils/const';
import {AppContext, Context} from './src/context/context';
import {useGetAsyncStorage} from './src/hooks/storage';
import {titles} from './src/utils';

const Stack = createNativeStackNavigator();

const sharedStyle = {
  backgroundColor: colors.green,
};

const App = () => {
  const [petData, setPetData] = useState<PetData[] | []>([]);
  const [hasChangedState, setHasChangedState] = useState<boolean>(true);

  const getData = useGetAsyncStorage();

  const fetchData = useCallback(async () => {
    try {
      const data = await getData(StorageKeys.PET_DATA);
      if (data && setPetData) {
        setPetData(data);
      }
    } catch (e) {
      throw e;
    }
  }, [getData, setPetData]);

  const handleSetPetData = useCallback((data: PetData[]) => {
    setPetData(data);
  }, []);

  useEffect(() => {
    if (hasChangedState) {
      fetchData();
      setHasChangedState(false);
    }
  }, [fetchData, hasChangedState]);

  const context: Context = useMemo(
    (): Context => ({
      petData,
      setPetData: handleSetPetData,
      hasChangedState,
      setHasChangedState,
      refetch: fetchData,
    }),
    [fetchData, handleSetPetData, hasChangedState, petData],
  );

  return (
    <AppContext.Provider value={context}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name={navigationKeys.HOME}
            component={Home}
            options={{
              headerTitle: titles.homeTitle,
              headerTintColor: colors.white,
              headerBackTitle: '',
              headerStyle: sharedStyle,
              headerRight: () => (
                <Button
                  color={colors.white}
                  showBorder={false}
                  text={titles.headerButtonCreate}
                  onPress={() => navigate('CreatePet')}
                />
              ),
            }}
          />
          <Stack.Screen
            name={navigationKeys.CREATE_PET}
            component={CreatePet}
            options={{
              headerTitle: titles.createPetTitle,
              headerTintColor: colors.white,
              headerBackTitle: '',
              headerStyle: sharedStyle,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
