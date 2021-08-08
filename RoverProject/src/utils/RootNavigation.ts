import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';

type RootStackParamList = {
  Home: undefined;
  CreatePet: undefined;
};

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: keyof RootStackParamList) {
  navigationRef?.current?.navigate(name);
}
