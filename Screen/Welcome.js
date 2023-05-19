import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';

function Welcome({navigation}) {
  return (
    <View style={{backgroundColor: '#161616', flex: 1, alignItems: 'center'}}>
      <Image
        source={require('../src/ilustrasi-welcome3.png')}
        style={{width: '100%'}}
      />
      <Image
        source={require('../src/helofitlogo-1.png')}
        style={{width: 240, height: 60, marginTop: 70}}
      />
      <Text
        style={{
          color: 'white',
          width: 243,
          fontSize: 14,
          marginTop: 10,
          textAlign: 'center',
        }}>
        Berkumpul dengan orang baru untuk mulai hidup sehat
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#C4F601',
          borderRadius: 16,
          width: 343,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
          Masuk
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          borderColor: '#C4F601',
          borderWidth: 2,
          borderRadius: 16,
          width: 343,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#C4F601'}}>
          Daftar
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: '#7C7C7C',
          width: 243,
          fontSize: 14,
          marginTop: 10,
          textAlign: 'center',
          marginTop: 80,
        }}>
        Tugas Akhir oleh Zulharmin dan Doni Chrisdianto K
      </Text>
    </View>
  );
}

export default Welcome;
