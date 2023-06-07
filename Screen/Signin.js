import React, {Component, useState} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Axios} from '../utils';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message';

const StringifyAsyncStorage = ({name = '', value}) => {
  const result = AsyncStorage.setItem(name, value);
  if (name && value) {
    return result;
  } else {
    return Alert.alert('Parsing Gagal');
  }
};

function Signin({navigation}) {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const body = {
        email,
        password,
      };
      const response = await Axios.post('/authentication/login', body);
      console.log({response});
      // console.log('bisa', response.data);
      if (response.data.message === 'OK') {
        const token = response.data.data.token;
        const refreshToken = response.data.data.refreshToken;
        const type = response.data.data.type;
        const dataUser = response.data.data.data;
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
        navigation.replace('Tabs');
      }
      // await AsyncStorage.setItem('token', response.data.token);
    } catch (error) {
      showMessage({
        message: 'Email Password Salah',
        type: 'danger',
      });
      console.log(error.response.statusText);
    }
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={false}
      style={{
        backgroundColor: '#161616',
        flex: 1,
      }}>
      <View
        style={{
          alignItems: 'center',
          padding: 16,
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
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Masukkan Email"
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
          value={email}
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
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{width: '85%'}}>
            <TextInput
              autoCapitalize="none"
              placeholder="Masukkan Password"
              secureTextEntry={isSecureEntry}
              placeholderTextColor={'#FFFFFF'}
              value={password}
              onChangeText={text => setPassword(text)}
              style={{color: '#FFFFFF'}}
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
