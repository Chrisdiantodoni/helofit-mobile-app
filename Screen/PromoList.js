//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios} from '../utils';
import Modal from 'react-native-modal';
import moment from 'moment';

const PromoList = ({navigation: {navigate, goBack, addListener}}) => {
  const [dataUser, setDataUser] = useState({});
  const [promo, setPromo] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [modalBanner, setModalBanner] = useState(null);
  const [merchantName, setMerchantName] = useState('');
  const [promoName, setPromoName] = useState('');
  const [poin, setPoin] = useState('');
  const [expiredIn, setExpiredIn] = useState('');

  const getPromoUser = async userId => {
    const response = await Axios.get(`/promo/ownPromo/${userId}`);
    try {
      if (response.data.message === 'OK') {
        const data = response?.data?.data;
        console.log(data);
        setPromo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      const userId = JSON.parse(res)?.id;
      console.log(userId);
      getPromoUser(userId);
    });
  };

  const handleShowModal = item => {
    setIsVisible(true);
    setPromoName(item.promo?.promo_name);
    setModalBanner(item?.promo.promo_img);
    setPoin(item.promo?.point);
    setExpiredIn(item.ExpiredIn);
    setMerchantName(item?.promo?.merchant?.merchant_name);
  };
  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      dataUserAsync();
    });
    return unsubscribe;
  }, [addListener]);
  return (
    <ScrollView style={styles.container}>
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
          Promo yang bisa digunakan
        </Text>
      </View>
      <View
        style={{
          paddingTop: 32,
          marginHorizontal: 16,
          justifyContent: 'center',
        }}>
        <Text style={styles.Heading28}>Daftar Promo Kamu</Text>
        <Text style={[styles.heading14, {paddingTop: 8}]}>
          Gunakan Promo yang telah kamu tukar dengan poin yang kamu miliki ya
        </Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {promo
            ?.filter(item => item.status_promo === 'Belum Digunakan')
            .map((item, index) => (
              <TouchableOpacity
                style={{
                  width: '95%',
                  height: 160,
                  borderRadius: 16,
                  marginTop: 32,
                }}
                onPress={() => handleShowModal(item)}>
                <Image
                  source={{uri: item?.promo?.promo_img}}
                  style={{
                    width: '100%',
                    height: 136,
                    borderRadius: 16,
                    resizeMode: 'cover',
                  }}
                />
              </TouchableOpacity>
            ))}
        </View>
      </View>
      <Modal
        isVisible={isVisible}
        style={{justifyContent: 'flex-end', margin: 0}}
        animationInTiming={900}
        animationOutTiming={500}
        swipeDirection={'down'}
        backdropOpacity={0.1}
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={() => setIsVisible(false)}>
        <View style={styles.Modal}>
          <View
            style={{
              backgroundColor: '#7C7C7C',
              width: 55,
              height: 3,
              marginBottom: 24,
              marginTop: 14,
            }}
          />
          <Image
            source={{uri: modalBanner}}
            style={{
              resizeMode: 'cover',
              width: '100%',
              height: 160,
              borderRadius: 10,
              marginBottom: 24,
            }}
          />
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{width: '85%', justifyContent: 'flex-start'}}>
              <Text style={[styles.Heading28, {marginBottom: 8}]}>
                {promoName}
              </Text>
              <Text
                style={[
                  styles.Heading28,
                  {fontSize: 14, lineHeight: 19, color: '#FFFFFF'},
                ]}>
                Berlaku sampai {moment(expiredIn).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View
              style={{
                marginRight: 10,
                marginTop: 40,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: '#C4F601',
                      fontSize: 24,
                      fontWeight: '700',
                    }}>
                    {poin}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: '#C4F601',
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    POIN
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              alignItems: 'center',
              marginTop: 24,
            }}>
            <Image
              source={require('../src/Merchant.png')}
              style={{
                width: 20,
                height: 20,
                marginRight: 11,
                resizeMode: 'stretch',
              }}
            />
            <Text
              style={[
                styles.Heading28,
                {
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#FFFFFF',
                },
              ]}>
              {merchantName}
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    flex: 1,
  },

  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  Heading28: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 20,
    color: '#FFF',
    width: '90%',
  },
  heading14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
    paddingTop: 5,
  },
  Modal: {
    backgroundColor: '#161616',
    borderRadius: 10,
    height: '70%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

//make this component available to the app
export default PromoList;
