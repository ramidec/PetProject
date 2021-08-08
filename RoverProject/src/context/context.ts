import {createContext} from 'react';
import {PetData} from '../utils/const';

export type Context = {
  petData: PetData[];
  setPetData: (petData: PetData[]) => void;
  hasChangedState: boolean;
  setHasChangedState: (changed: boolean) => void;
  refetch: () => void;
};

export const AppContext = createContext<Context | undefined>(undefined);
