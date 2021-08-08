import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import {EmptyState} from '../components/EmptyState';
import {PetItem} from '../components/PetItem';
import {colors} from '../utils/colors';
import {navigationKeys} from '../utils/const';
import {useDeleteItemFromStorage} from '../hooks/storage';
import {useAppContext} from '../hooks/contexts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export const Home = ({navigation}: NativeStackScreenProps<{}>) => {
  const [clearData] = useDeleteItemFromStorage();
  const {petData} = useAppContext();

  const deleteAndRefetch = useCallback(
    id => {
      clearData(id);
    },
    [clearData],
  );

  const renderPetItem = useCallback(
    ({item}) => (
      <PetItem
        petDescription={item?.description}
        petName={item?.name}
        imageSource={item?.petImage}
        id={item?.id}
        deleteAndRefetch={deleteAndRefetch}
      />
    ),
    [deleteAndRefetch],
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const navigateToCreate = useCallback(() => {
    navigation.dispatch(
      CommonActions.navigate({
        name: navigationKeys.CREATE_PET,
      }),
    );
  }, [navigation]);

  const emptyText =
    'Looks like you haven’t added any pets yet. You can add your first pet profile from the button below.';
  return (
    <SafeAreaView style={styles.background}>
      {petData?.length ? (
        <FlatList
          data={petData}
          extraData={petData}
          renderItem={renderPetItem}
          keyExtractor={keyExtractor}
        />
      ) : (
        <View style={styles.addContainer}>
          <EmptyState text={emptyText} onPress={navigateToCreate} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  addContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
