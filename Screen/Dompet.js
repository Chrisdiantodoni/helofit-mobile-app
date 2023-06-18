import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {currency, Axios} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dompet = ({navigation: {goBack, navigate, addListener}}) => {
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
    const unsubscribe = addListener('focus', () => {
      dataUserAsync();
    });
    return unsubscribe;
  }, []);

  const getUser = async userId => {
    console.log(userId);
    try {
      const response = await Axios.get(`/user/${userId}`);
      console.log(response);
      const data = response?.data;
      if (response?.data?.message === 'OK') {
        setDataUser(data?.data?.user_info);
        console.log('dataUser', data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          Riwayat Transaksi
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          paddingTop: 14,
          backgroundColor: '#000000',
          paddingBottom: 40,
          borderRadius: 16,
        }}>
        <Text style={[styles.heading14, {color: '#FFFFFF', marginBottom: 8}]}>
          Dompet Olahragamu
        </Text>
        <Text style={[styles.heading28, {color: '#FFFFFF'}]}>
          {currency(dataUser?.balance)}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 24}}>
          <TouchableOpacity
            style={{
              width: 120,
              height: 40,
              backgroundColor: '#C4F601',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigate('TopUp')}>
            <Image
              source={require('../src/Plus.png')}
              style={{width: 32, height: 32}}
            />
            <Text style={[styles.heading28, {fontSize: 14, marginLeft: 5}]}>
              Isi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 120,
              height: 40,
              backgroundColor: '#000000',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 24,
              borderWidth: 1,
              borderColor: '#C4F601',
            }}
            onPress={() => navigate('Withdraw')}>
            <Image
              source={require('../src/Tarik.png')}
              style={{width: 32, height: 32}}
            />
            <Text
              style={[
                styles.heading28,
                {fontSize: 14, color: '#C4F601', marginLeft: 5},
              ]}>
              Tarik
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 8}}>
        <View
          style={{
            backgroundColor: '#000000',
            marginBottom: 2,
            paddingBottom: 27,
            borderRadius: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
            }}>
            <View style={{width: '15%', alignItems: 'center'}}>
              <Image
                source={require('../src/Group.png')}
                style={{width: 24, height: 24}}
              />
            </View>
            <View style={{width: '65%'}}>
              <Text
                style={[styles.heading28, {color: '#FFFFFF', fontSize: 14}]}>
                Gak perlu jago yang perlu...
              </Text>
              <Text style={styles.small12}>20 Jan, 04:48 AM</Text>
            </View>
            <Text style={[styles.heading28, {color: '#FFFFFF', fontSize: 14}]}>
              -20.000
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#000000',
            marginBottom: 2,
            paddingBottom: 27,
            borderRadius: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
            }}>
            <View style={{width: '15%', alignItems: 'center'}}>
              <Image
                source={require('../src/Group.png')}
                style={{width: 24, height: 24}}
              />
            </View>
            <View style={{width: '65%'}}>
              <Text
                style={[styles.heading28, {color: '#FFFFFF', fontSize: 14}]}>
                Gak perlu jago yang perlu...
              </Text>
              <Text style={styles.small12}>20 Jan, 04:48 AM</Text>
            </View>
            <Text style={[styles.heading28, {color: '#FFFFFF', fontSize: 14}]}>
              -20.000
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  heading14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#000000',
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#000000',
  },
  small12: {
    fontFamily: 'OpenSans',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: '#7C7C7C',
  },
});

//make this component available to the app
export default Dompet;
