import React, {FunctionComponent} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '../components/Icon';
import {colors} from '../utils/colors';

interface PetItemProps {
  imageSource?: ImageSourcePropType;
  petName: string;
  petDescription: string;
  id: string;
  deleteAndRefetch: (id: string) => void;
}

const ImagePlaceholder: FunctionComponent = () => (
  <Icon
    size={40}
    type="MaterialCommunityIcons"
    name="dog"
    style={styles.placeholder}
  />
);

export const PetItem: FunctionComponent<PetItemProps> = ({
  imageSource,
  petName,
  petDescription,
  id,
  deleteAndRefetch,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <ImagePlaceholder />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.petName}>{petName}</Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.petDescription}>
          {petDescription}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteAndRefetch(id)}
        style={styles.iconContainer}>
        <Icon type="MaterialCommunityIcons" name="delete" />
      </TouchableOpacity>
    </View>
  );
};

const IMAGE_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  image: {height: IMAGE_SIZE, width: IMAGE_SIZE, borderRadius: IMAGE_SIZE},
  imageContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  textContainer: {flex: 5, justifyContent: 'center', paddingLeft: 10},
  petName: {fontSize: 17, fontWeight: '700', paddingBottom: 6},
  petDescription: {fontSize: 13, fontWeight: '400'},
  iconContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  placeholder: {
    borderColor: colors.black,
    borderWidth: 1,
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
