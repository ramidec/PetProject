import {useContext} from 'react';
import {Context, AppContext} from '../context/context';

export const useAppContext = (): Context => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Context not available');
  }
  return context;
};
