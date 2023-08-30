import React, {Component, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Dropdown} from 'react-native-element-dropdown';
import Axios from '../utils/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';

const StringifyAsyncStorage = ({name = '', value}) => {
  const result = AsyncStorage.setItem(name, value);
  if (name && value) {
    return result;
  } else {
    return Alert.alert('Parsing Gagal');
  }
};

function Signin({navigation}) {
  const [jenisKelamin, setJenisKelamin] = useState(null);
  const [password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [username, setusername] = useState('');
  const [nohp, setNohp] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [securePin, setSecurePin] = useState(true);
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  const data = [
    {
      value: 'Laki - Laki',
      label: 'Laki - Laki',
    },
    {
      value: 'Perempuan',
      label: 'Perempuan',
    },
  ];

  const handleSignup = async () => {
    console.log('jalan');
    const body = {
      username: username,
      password: password,
      email: Email,
      pin: pin,
    };

    try {
      console.log('masuk try');

      await Axios.post('/authentication/register', body).then(res => {
        if (res.data.message === 'OK') {
          const token = res.data.data.token;
          const refreshToken = res.data.data.refreshToken;
          const type = res.data.data.type;
          const dataUser = res.data.data.data;
          console.log({token, refreshToken, type, dataUser});
          StringifyAsyncStorage({
            name: 'token',
            value: token,
          });
          StringifyAsyncStorage({
            name: 'refreshToken',
            value: refreshToken,
          });
          StringifyAsyncStorage({
            name: 'type',
            value: type,
          });
          StringifyAsyncStorage({
            name: 'dataUser',
            value: JSON.stringify(dataUser),
          });
          navigation.replace('Signin');
        }
        console.log({res: res.data});
      });
    } catch (error) {
      showMessage({
        message: error.response.data.data[0],
        type: 'danger',
      });
      console.log('error', error.response.data.data[0]);
      // setMessage(error.response.data.message);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#161616',
        flex: 1,
      }}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={false}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../src/ilustrasi-welcome3-blur.png')}
            style={{width: '100%', resizeMode: 'cover'}}
          />
          <Image
            source={require('../src/helofitlogo-1.png')}
            style={{
              width: 240,
              height: 60,
              marginTop: 118,
              position: 'absolute',
            }}
          />
          <View style={{marginTop: -60, alignItems: 'center'}}>
            <View
              style={{
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontWeight: '700',
                  marginBottom: 24,
                  paddingHorizontal: 16,
                }}>
                Bergabung dengan Kami
              </Text>
            </View>

            <TextInput
              autoCapitalize="none"
              placeholder="Masukkan Username"
              placeholderTextColor={'#FFFFFF'}
              value={username}
              style={{
                backgroundColor: '#7c7c7c',
                borderRadius: 16,
                width: 355,
                height: 60,
                color: '#FFFFFF',
                paddingLeft: 22,
                fontSize: 14,
                fontFamily: 'openSans',
                marginBottom: 16,
                color: '#FFFFFF',
              }}
              onChangeText={text => setusername(text)}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Masukkan Email"
              placeholderTextColor={'#FFFFFF'}
              value={Email}
              style={{
                backgroundColor: '#7c7c7c',
                borderRadius: 16,
                width: 355,
                height: 60,
                color: '#FFFFFF',
                paddingLeft: 22,
                fontSize: 14,
                fontFamily: 'openSans',
                marginBottom: 16,
                color: '#FFFFFF',
              }}
              onChangeText={text => setEmail(text)}
            />
            <View
              style={{
                backgroundColor: '#7c7c7c',
                borderRadius: 16,
                width: 355,
                height: 60,
                color: '#FFFFFF',
                paddingLeft: 22,
                fontSize: 14,
                marginBottom: 16,
                fontFamily: 'openSans',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '85%'}}>
                <TextInput
                  style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                  }}
                  autoCapitalize="none"
                  placeholder="Masukkan Password"
                  secureTextEntry={secureText}
                  placeholderTextColor={'#FFFFFF'}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
              </View>
              <TouchableOpacity onPress={() => setSecureText(prev => !prev)}>
                <Icon
                  name={secureText ? 'eye-slash' : 'eye'}
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: '#7c7c7c',
                borderRadius: 16,
                width: 355,
                height: 60,
                color: '#FFFFFF',
                paddingLeft: 22,
                fontSize: 14,
                marginBottom: 16,
                fontFamily: 'openSans',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '85%'}}>
                <TextInput
                  style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                  }}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  placeholder="Masukkan Pin"
                  secureTextEntry={securePin}
                  placeholderTextColor={'#FFFFFF'}
                  value={pin}
                  onChangeText={text => setPin(text)}
                  maxLength={6}
                />
              </View>
              <TouchableOpacity onPress={() => setSecurePin(prev => !prev)}>
                <Icon
                  name={securePin ? 'eye-slash' : 'eye'}
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#C4F601',
                borderRadius: 16,
                width: 355,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 32,
              }}
              onPress={handleSignup}>
              <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                Daftar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  marginRight: 5,
                  marginTop: 8,
                }}>
                Sudah punya akun?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text
                  style={{
                    color: '#C4F601',
                    marginRight: 5,
                    marginTop: 8,
                  }}>
                  masuk
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <FlashMessage position="top" />
    </ScrollView>
  );
}
export default Signin;
