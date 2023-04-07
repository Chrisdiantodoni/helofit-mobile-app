import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';

function Onboardingitem({item}) {
  const {width} = useWindowDimensions();
  return (
    <View style={(styles.container, {width})}>
      <Image source={item.image} style={styles.image} />
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
    marginHorizontal: 16,
    borderRadius: 5,
    width: 359,
    height: 160,
    marginTop: 32,
  },
});

export default Onboardingitem;
