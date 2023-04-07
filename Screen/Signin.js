import React, {Component, useState} from 'react';
import {TouchableOpacity, Image, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Axios} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authenticationAPI} from '../API';
import {REACT_APP_BASE_URL} from '@env';

function Signin({navigation}) {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const body = {
        username,
        password,
      };
      const response = await Axios.post('/authentication/login', body);
      console.log('bisa', response.data);
      navigation.navigate('Tabs');

      // await AsyncStorage.setItem('token', response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={false}
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
              fontSize: 14,
              marginTop: 10,
              fontWeight: '400',
            }}>
            Hallo Kamu,
          </Text>
          <Text
            style={{
              color: 'white',
              width: 295,
              fontSize: 24,
              fontWeight: '700',
              marginBottom: 24,
            }}>
            Selamat Datang kembali
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
        <View
          style={{
            backgroundColor: '#7c7c7c',
            borderRadius: 16,
            width: 355,
            height: 60,
            color: '#FFFFFF',
            paddingLeft: 22,
            fontSize: 14,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: '85%'}}>
            <TextInput
              placeholder="Masukkan Password"
              secureTextEntry={isSecureEntry}
              placeholderTextColor={'#FFFFFF'}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <TouchableOpacity onPress={() => setIsSecureEntry(prev => !prev)}>
            <Icon
              name={isSecureEntry ? 'eye-slash' : 'eye'}
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
          }}
          onPress={() => navigation.navigate('Pin')}>
          <Text
            style={{
              alignSelf: 'flex-end',
              color: '#C4F601',
              marginRight: 5,
              marginTop: 8,
            }}>
            Lupa Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#C4F601',
            borderRadius: 16,
            width: 355,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
          onPress={handleLogin}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            Masuk
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default Signin;
