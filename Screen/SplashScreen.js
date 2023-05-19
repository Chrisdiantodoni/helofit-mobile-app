import React, {Component, useEffect, useState} from 'react';
import {View, Image, Text, ProgressBarAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProgressBar} from 'react-native-paper';

const SplashScreen = ({navigation}) => {
  //   const [count, setCount] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem('token').then(res => {
      if (res) {
        navigation.replace('Tabs');
      }
      console.log(res);
    });
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../src/helofitlogo-1.png')}
        style={{width: '70%', height: '10%', resizeMode: 'stretch'}}
      />
      <Text
        style={{fontFamily: 'OpenSans', color: '#FFFFFF', fontWeight: '400'}}>
        Bantu Kamu Temukan Teman Olahraga
      </Text>
      <Text
        style={{fontFamily: 'OpenSans', color: '#FFFFFF', fontWeight: '400'}}>
        dan Fasilitas yang Kamu Mau
      </Text>
      <View>
        <ProgressBarAndroid
          style={{borderRadius: 8, marginTop: 10}}
          progress={0.5}
          color={'#FFFFFF'}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
