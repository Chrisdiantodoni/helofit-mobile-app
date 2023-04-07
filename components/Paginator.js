import React, {Component} from 'react';
import {View, StyleSheet, Animated, useWindowDimensions} from 'react-native';

const Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row', marginTop: 16}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7C7C7C',
    marginHorizontal: 8,
  },
});

export default Paginator;
