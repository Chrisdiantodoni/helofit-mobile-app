import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {ProgressBar} from 'react-native-paper';
import Svg from 'react-native-svg';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Axios} from '../utils';
import moment from 'moment';
const {width} = Dimensions.get('window');

function Promo({navigation: {goBack, navigate, addListener}}) {
  const [dataUser, setDataUser] = useState({});
  const [promo, setPromo] = useState([]);
  const [promoName, setPromoName] = useState('');
  const [poin, setPoin] = useState('');
  const [expiredIn, setExpiredIn] = useState('');
  const [modalBanner, setModalBanner] = useState(null);
  const [merchantName, setMerchantName] = useState('');
  const [idPromo, setPromoId] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      const userId = JSON.parse(res)?.id;
      console.log(userId);
      getUser(userId);
    });
  };

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
  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      dataUserAsync();
      getPromoUser();
    });
    return unsubscribe;
  }, [addListener]);
  const [isVisible, setIsVisible] = useState(false);

  const getPromoUser = async () => {
    const response = await Axios.get('/promo');
    try {
      if (response.data.message === 'OK') {
        console.log('data', response);
        const data = response?.data?.data;
        setPromo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = item => {
    setIsVisible(true);
    setPromoName(item.promo_name);
    setModalBanner(item.promo_img);
    setPoin(item.point);
    setExpiredIn(item.ExpiredIn);
    setMerchantName(item.merchant?.merchant_name);
    setPromoId(item.id);
    setMerchantId(item.merchant?.id);
  };

  const handleUsePromo = async (idPromo, poin, merchantId) => {
    const body = {
      promoId: idPromo,
      userId: dataUser?.id,
      status_promo: 'belum digunakan',
      poin: poin,
      merchantId,
    };
    try {
      await Axios.post('/promo', body)
        .then(res => {
          console.log(res);
          alert('Sukses Apply Promo');
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }

    console.log({body});
  };

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
          List Promo
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.badge}
          onPress={() => navigate('Tabs', {screen: 'Task'})}>
          <View
            style={{
              backgroundColor: '#000000',
              paddingHorizontal: 16,
              borderRadius: 16,
              paddingVertical: 25,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../src/Reward.png')}
                style={{width: 26, height: 45, marginRight: 20}}
              />
              <View style={{width: '70%'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    fontFamily: 'OpenSans',
                    color: '#FFFFFF',
                    paddingTop: 5,
                    fontWeight: '700',
                  }}>
                  Sekarang kamu memiliki
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    fontFamily: 'OpenSans',
                    color: '#FFFFFF',
                  }}>
                  {dataUser?.point} POIN, yuk selesaikan task lagi...
                </Text>
              </View>

              <Ionicon
                name="chevron-forward-outline"
                size={30}
                style={{
                  fontWeight: 'bold',
                  color: '#C4F601',
                  paddingRight: 2,
                  paddingTop: 8,
                  marginLeft: 20,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {promo
            ?.filter(
              filter => moment(filter.ExpiredIn) >= moment().startOf('day'),
            )
            .map((item, index) => (
              <View style={styles.card}>
                <TouchableOpacity onPress={() => handleShowModal(item)}>
                  <Image
                    source={{uri: item.promo_img}}
                    style={{
                      width: '100%',
                      height: 138,
                      resizeMode: 'contain',
                      borderRadius: 10,
                    }}
                  />
                  <Text style={[styles.Heading28, {marginTop: 10}]}>
                    {item.promo_name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>

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
              resizeMode: 'contain',
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
              <Text style={[styles.heading28, {marginBottom: 8}]}>
                {promoName}
              </Text>
              <Text
                style={[
                  styles.heading28,
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
                styles.heading28,
                {
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#FFFFFF',
                },
              ]}>
              {merchantName}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 38,
              marginHorizontal: 16,
              backgroundColor: '#C4F601',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginTop: 80,
            }}
            disabled={parseInt(poin) > parseInt(dataUser?.point) ? true : false}
            onPress={() => handleUsePromo(idPromo, poin, merchantId)}>
            <Text
              style={{
                color: '#000000',
                fontWeight: '700',
                fontSize: 16,
                alignSelf: 'center',
              }}>
              Tukarkan Poin
            </Text>
          </TouchableOpacity>
          {parseInt(poin) > parseInt(dataUser?.point) ? (
            <Text
              style={{
                color: '#DC3545',
                fontWeight: '700',
                fontSize: 16,
                alignSelf: 'center',
                marginTop: 10,
              }}>
              Poin anda tidak cukup
            </Text>
          ) : null}
        </View>
      </Modal>
    </ScrollView>
  );
}

export default Promo;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  container: {
    backgroundColor: '#161616',
    flex: 1,
  },
  badge: {
    backgroundColor: '#161616',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 25,
    paddingBottom: 28,
    paddingTop: 27,
  },
  Heading28: {
    fontFamily: 'OpenSans',
    fontWeight: '700',
    fontSize: 20,
    color: '#FFF',
    width: '90%',
  },

  card: {
    borderRadius: 16,
    backgroundColor: '#000000',
    borderColor: '#ffffff',
    borderWidth: 1,
    padding: 16,
    marginTop: 26,
    width: '95%',
    marginHorizontal: 10,
  },
  inCard: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#000000',
  },

  Modal: {
    backgroundColor: '#161616',
    borderRadius: 10,
    height: '70%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heading28: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#C4F601',
    lineHeight: 27,
    alignSelf: 'flex-start',
  },
});
