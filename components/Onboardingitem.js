import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';

function Onboardingitem({item}) {
  const {width} = useWindowDimensions();
  return (
    <View style={(styles.container, {width})}>
      <Image
        source={{
          uri: item['promo_img'] ? item['promo_img'] : item['banner_img'],
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 5,
    width: '93%',
    resizeMode: 'contain',
    height: 136,
    marginTop: 32,
  },
});

export default Onboardingitem;
