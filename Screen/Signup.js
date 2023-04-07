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
import axios from 'axios';

function Signin({navigation}) {
  const [jenisKelamin, setJenisKelamin] = useState(null);
  const [password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [username, setusername] = useState('');
  const [nohp, setNohp] = useState('');
  const [secureText, setSecureText] = useState(true);
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
      gender: 'male',
      phone_number: '0822',
    };

    try {
      console.log('masuk try');

      await Axios.post('/authentication/register', body).then(res => {
        console.log({res: res.data});
        navigation.navigate('Signin');
      });
    } catch (error) {
      console.log('error', error);
      // setMessage(error.response.data.message);
    }
  };

  const getData = async () => {
    try {
      // const response = await Axios.get('/authentication/data');

      const response = await axios.get(
        `http://192.168.67.118:3002/api/v1/client/authentication/data`,
      );

      console.log('response', response);
    } catch (error) {
      console.log('error dia', error);
    }
  };

  useEffect(() => {
    console.log('jalaannnn');
    getData();
  }, []);
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
            {/* <Dropdown
              style={{
                backgroundColor: '#7c7c7c',
                borderRadius: 16,
                width: 355,
                height: 60,
                color: '#FFFFFF',
                paddingLeft: 22,
                fontSize: 14,
                marginBottom: 16,
                paddingRight: 24,
                fontFamily: 'openSans',
              }}
              dropdownPosition={'auto'}
              selectedTextStyle={{
                fontSize: 14,
                fontFamily: 'OpenSans',
                color: '#Ffffff',
                backgroundColor: '#7c7c7c',
              }}
              placeholderStyle={{
                fontSize: 14,
                fontFamily: 'OpenSans',
                color: '#ffffff',
              }}
              containerStyle={{
                borderRadius: 16,
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#7c7c7c',
              }}
              activeColor={{
                backgroundColor: '#7c7c7c',
              }}
              itemTextStyle={{
                color: '#FFFFFF',
                fontSize: 14,
                fontFamily: 'OpenSans',
              }}
              iconStyle={{
                tintColor: '#FFFFFF',
              }}
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Jenis kelamin"
              searchPlaceholder="Search..."
              value={jenisKelamin}
              onChange={item => {
                setJenisKelamin(item.value), console.log(item.value);
              }}
            /> */}
            {/* 
            <TextInput
              placeholder="Masukkan No Handphone"
              keyboardType="number-pad"
              value={nohp}
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
                fontFamily: 'openSans',
              }}
              onChangeText={text => setNohp(text)}
            /> */}
            <TextInput
              placeholder="Masukkan Pin"
              keyboardType="number-pad"
              value={pin}
              maxLength={6}
              secureTextEntry={true}
              placeholderTextColor={'#FFFFFF'}
              style={{
                backgroundColor: '#7c7c7c',
                borderRadius: 8,
                width: 355,
                height: 60,
                color: '#FFFFFF',
                fontSize: 14,
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: 'openSans',
              }}
              onChangeText={text => setPin(text)}
            />

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
    </ScrollView>
  );
}
export default Signin;
