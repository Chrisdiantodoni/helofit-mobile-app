import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ReactNativePinView from 'react-native-pin-view';
import Icon from 'react-native-vector-icons/Ionicons';

const Pin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: '#161616',
        flex: 1,
        padding: 16,
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          source={require('../src/ilustrasi-welcome3-blur.png')}
          style={{width: '100%'}}
        />
        <Image
          source={require('../src/helofitlogo-1.png')}
          style={{width: 240, height: 60, marginTop: 118, position: 'absolute'}}
        />
        <View
          style={{
            alignSelf: 'flex-start',
          }}>
          <Text
            style={{
              color: 'white',
              width: 295,
              fontSize: 24,
              fontWeight: '700',
              marginTop: 10,
            }}>
            Bantu Temukan Akunmu
          </Text>
          <Text
            style={{
              color: 'white',
              width: 295,
              fontSize: 14,
              marginBottom: 24,

              fontWeight: '400',
            }}>
            Masukkan Username dan kami akan kirimkan kode verifikasi ke Nomor
            Handphone akun terkait
          </Text>
        </View>

        <TextInput
          placeholder="Masukkan Username"
          placeholderTextColor={'#FFFFFF'}
          style={{
            backgroundColor: '#7c7c7c',
            borderRadius: 16,
            width: 355,
            height: 60,
            color: '#FFFFFF',
            paddingLeft: 22,
            fontSize: 14,
            marginBottom: 16,
          }}
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <TextInput
          placeholder="Masukkan PIN"
          placeholderTextColor={'#FFFFFF'}
          secureTextEntry={true}
          keyboardType="number-pad"
          value={pin}
          onChangeText={text => setPin(text)}
          style={{
            backgroundColor: '#7c7c7c',
            borderRadius: 16,
            width: 355,
            height: 60,
            color: '#FFFFFF',
            paddingLeft: 22,
            fontSize: 14,
            marginBottom: 16,
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#C4F601',
            borderRadius: 16,
            width: 355,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 48,
          }}
          onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            Selanjutnya
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Pin;
