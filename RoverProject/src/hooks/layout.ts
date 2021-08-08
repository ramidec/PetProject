import {useState, useEffect} from 'react';
import {Keyboard, Dimensions} from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;

export const WINDOW_HEIGTH = Dimensions.get('window').height;

export const useKeyboardLayout = (): [boolean, number] => {
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      'keyboardDidShow',
      (event: any) => {
        setVisible(true);
        if (event && event.endCoordinates) {
          setHeight(event.endCoordinates.height);
        }
      },
    );
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return [visible, height];
};
