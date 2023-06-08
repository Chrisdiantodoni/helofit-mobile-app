import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Axios, currency} from '../../utils';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmTopUp = ({navigation: {goBack, navigate, replace}, route}) => {
  const [dataUser, setDataUser] = useState({});

  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser')
      .then(res => {
        const userId = JSON.parse(res)?.id;
        console.log(userId);
        getUser(userId);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    dataUserAsync();
  }, []);

  const getUser = async userId => {
    try {
      const response = await Axios.get(`/user/${userId}`);
      console.log(response);
      const data = response?.data;
      if (data?.message === 'OK') {
        setDataUser(data?.data);
        console.log('dataUser', data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTopUp = async () => {
    const userId = dataUser?.id;
    const body = {
      nominal: parseInt(nominal),
    };
    await Axios.put(`/wallet/topup/${userId}`, body)
      .then(res => {
        if (res) {
          Alert.alert('Selamat Dana sudah ditambahkan di dompet kamu');
          replace('Tabs');
        }
      })
      .catch(err => {
        console.log(err);
      });

    console.log({body});
  };

  const bank = route?.params.bank;
  const nominal = route?.params.Nominal;
  console.log({bank, nominal});

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#C4F601',
          flexDirection: 'row',
          height: 70,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginLeft: 24, marginRight: 32}}
          onPress={() => goBack()}>
          <Ionicon
            name="chevron-back-outline"
            size={25}
            style={{
              fontWeight: 'bold',
              color: '#000000',
              paddingRight: 2,
            }}
          />
        </TouchableOpacity>
        <Text style={[styles.header, {color: '#000000', fontSize: 20}]}>
          Konfirmasi Pembayaran
        </Text>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <View style={{marginTop: 32}}>
          <Text style={styles.heading28}>{bank} Virtual Account</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40,
          }}>
          <View
            style={{
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              paddingLeft: 22,
              height: 60,
              justifyContent: 'center',
              width: '70%',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: '700'}}>
              1234567890123456
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 40,
              height: 32,
              borderRadius: 16,
              borderColor: '#C4F601',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#C4F601',
                fontWeight: '700',
                fontFamily: 'OpenSans',
              }}>
              Salin
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.heading28}>Total Pembayaran</Text>
        </View>
        <Text
          style={[
            styles.heading28,
            {fontSize: 24, color: '#C4F601', marginBottom: 0},
          ]}>
          Rp. {currency(parseInt(nominal))}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleTopUp}>
          <Text
            style={[
              styles.heading28,
              {color: '#000000', marginBottom: 0, fontSize: 16},
            ]}>
            Konfirmasi Pembayaran
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => replace('Tabs')}>
          <Text
            style={[
              styles.heading28,
              {color: '#FF424D', marginBottom: 0, fontSize: 16},
            ]}>
            Batalkan Pembayaran
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmTopUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  centeredText: {
    flex: 1,
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  textInput: {
    backgroundColor: '#7C7c7c',
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    height: 60,
    color: '#FFFFFF',
    width: '100%',
    textAlign: 'right',
    paddingRight: 20,
    fontSize: 16,
    width: '85%',
  },
  heading14: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#ffffff',
    marginTop: 5,
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#ffffff',
    marginBottom: 16,
  },
  buttonGroup: {
    marginTop: 44,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#C4F601',
    paddingVertical: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 47,
  },
  button2: {
    width: '100%',
    height: 60,
    backgroundColor: '#161616',
    marginTop: 10,
    paddingVertical: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});
