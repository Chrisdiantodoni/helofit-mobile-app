import React, {Component, useState, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Animated} from 'react-native';

import slides from '../slides';
import Onboardingitem from './Onboardingitem';
import Paginator from './Paginator';

const dataSlide = [
  {
    id: 1,
    image: require('../src/BannerPromo.png'),
  },
  {
    id: 2,
    image: require('../src/BannerPromo.png'),
  },
  {
    id: 3,
    image: require('../src/BannerPromo.png'),
  },
  {
    id: 4,
    image: require('../src/BannerPromo.png'),
  },
];

export default Onboarding = ({data = dataSlide}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentTreshold: 50}).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <Onboardingitem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={viewableItemsChanged}
      />
      <Paginator data={slides} scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
