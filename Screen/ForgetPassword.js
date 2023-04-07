import React, {Component, useState} from 'react';
import {TouchableOpacity, Image, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function ForgetPassword({navigation}) {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [password, setPassword] = useState('');
  return (
    <View
      style={{
        backgroundColor: '#161616',
        flex: 1,
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
            fontSize: 24,
            fontWeight: '700',
            marginTop: 10,
          }}>
          Masukkan Password Baru
        </Text>
        <Text
          style={{
            color: 'white',
            width: 295,
            fontSize: 14,
            marginBottom: 24,

            fontWeight: '400',
          }}></Text>
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
          backgroundColor: '#C4F601',
          borderRadius: 16,
          width: 355,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 48,
        }}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
          Selanjutnya
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default ForgetPassword;
