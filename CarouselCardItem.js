import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const CarouselCardItem = ({item, index}) => {
  return (
    <View>
      <Image source={{require: item.imgUrl}} style={styles.image} />
      <View>
        <Image source={require('./src/BannerPromo.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 359,
    height: 160,
    borderRadius: 5,
  },
});

export default CarouselCardItem;
