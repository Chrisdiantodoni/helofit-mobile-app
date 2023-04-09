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
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Axios} from '../utils';
import {showMessage, hideMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {Button} from 'react-native-paper';

const Pin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  const handlePin = async () => {
    console.log('hallo');
    try {
      const body = {username, pin};
      const response = await Axios.post(
        '/authentication/find-account-by-pin',
        body,
      );

      if (response.data.data !== null) {
        navigation.navigate('ForgetPassword', {username, pin});
      } else {
        // Alert.alert('username salah');
        showMessage({
          message: 'User Tidak Ditemukan',
          type: 'danger',
        });
      }
      console.log(response.data.data);
    } catch (error) {
      showMessage({
        message: error.response.data.message,
        type: 'danger',
      });
      console.log(error.response.data.message);
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
          style={{
            width: 240,
            height: 60,
            marginTop: 118,
            position: 'absolute',
          }}
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
          autoCapitalize="none"
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
          autoCapitalize="none"
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
          // onPress={handlePin}
          onPress={handlePin}>
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
