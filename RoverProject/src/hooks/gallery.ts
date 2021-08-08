import {useCallback, useMemo, useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

export const useGalleryFiles: (
  params: ImageLibraryOptions,
) => (ImageSourcePropType | (() => void) | undefined)[] = (
  params: ImageLibraryOptions,
) => {
  const [imageUri, setImageUri] = useState<ImageSourcePropType | undefined>(
    undefined,
  );
  const openGallery = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: params?.mediaType,
        maxHeight: params?.maxHeight,
        maxWidth: params?.maxWidth,
      },
      image => {
        if (image?.didCancel) {
          return undefined;
        }
        setImageUri({uri: image?.assets?.[0].uri});
      },
    );
  }, [params?.maxHeight, params?.maxWidth, params?.mediaType]);
  return useMemo(() => [openGallery, imageUri], [openGallery, imageUri]);
};
