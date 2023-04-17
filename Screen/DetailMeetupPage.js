import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-paper';
import {Axios, currency} from '../utils';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import BuatRoom from './Meetup/BuatRoom';

const DetailMeetupPage = (props, {navigation}) => {
  const [totalPlayer, setTotalPlayer] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const id = props.route.params.id;
  const [data, setData] = useState({});

  const handlePlayer = type => {
    switch (type) {
      case 'minus':
        setTotalPlayer(totalPlayer == 1 ? 1 : totalPlayer - 1);
        break;
      case 'plus':
        setTotalPlayer(totalPlayer + 1);
        break;
      default:
        break;
    }
  };

  const getDetailRoom = async () => {
    try {
      if (!id) {
        showMessage({
          message: 'Tidak ada Meetup',
          type: 'danger',
        });
      } else {
        const {data} = await Axios.get(`/room/${id}`);
        if (data.message === 'OK') {
          console.log(data.data);
          setData(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const priceperPerson = (total, max_capacity) => {
    const result = parseInt(total) / parseInt(max_capacity);
    return result;
  };

  const callAnotherPerson = (room_detail = [], index) => {
    const result = room_detail[index]?.user?.username;

    return result;
  };

  useEffect(() => {
    getDetailRoom();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={{
            uri: data?.facility?.banner_img
              ? data?.facility?.banner_img
              : 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          }}
          style={{
            width: '100%',
            height: 187.5,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            top: 140,
            left: 310,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            backgroundColor: '#C4F601',
            width: 55,
            height: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <Ionicon
            name="people-outline"
            size={15}
            style={{
              fontWeight: 'bold',
              color: '#000000',
              paddingRight: 2,
            }}
          />
          <Text style={{fontSize: 12, color: '#000000', fontWeight: '400'}}>
            {data.room_detail?.length} / {data.max_capacity}
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text
            style={{
              fontSize: 22,
              color: '#C4F601',
              fontWeight: '700',
              fontFamily: 'OpenSans',
              marginBottom: 8,
              lineHeight: 27.24,
            }}>
            {data.room_name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.heading14}>
              {data?.facility?.category?.category_name || '-'}
            </Text>
            <Text
              style={{
                fontWeight: '700',
                color: '#D9D9D9',
                marginHorizontal: 16,
              }}>
              |
            </Text>
            <Text style={[styles.heading14, {fontWeight: '400'}]}>
              {data?.gender === 'male' ? 'Laki - Laki' : 'Perempuan'}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer2}>
          <View style={{flexDirection: 'row', paddingBottom: 4}}>
            <View
              style={{
                width: '10%',
                alignItems: 'center',
              }}>
              <Ionicon
                name="location-outline"
                size={20}
                style={{fontWeight: 'bold', color: '#ffffff'}}
              />
            </View>
            <View>
              <Text style={styles.heading14}>
                {data?.facility?.merchant?.address || '-'}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <Text style={styles.small12}>lihat detail fasilitas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 28}}>
                  <Text style={styles.small12}>lacak dari map</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 4}}>
            <View
              style={{
                width: '10%',
                alignItems: 'center',
              }}>
              <Ionicon
                name="time-outline"
                size={20}
                style={{fontWeight: 'bold', color: '#ffffff'}}
              />
            </View>
            <View>
              <Text style={styles.heading14}>
                {moment(data?.booking?.booking_date).format('ddd, D MMM')}{' '}
                {data?.booking?.time
                  ? `${JSON.parse(data?.booking?.time)[0]} - ${
                      JSON.parse(data?.booking?.time)[1]
                    }`
                  : ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 4}}>
            <View
              style={{
                width: '10%',
                alignItems: 'center',
              }}>
              <Ionicon
                name="pricetag-outline"
                size={20}
                style={{fontWeight: 'bold', color: '#ffffff'}}
              />
            </View>
            <View>
              <Text style={styles.heading14}>
                Rp {currency(data?.booking?.total)} (
                {`Rp ${currency(
                  priceperPerson(data?.booking?.total, data?.max_capacity),
                )}`}{' '}
                / Pemain ){/* Rp.400.000 (40.000/pemain) */}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.subContainer3, {flexDirection: 'row'}]}>
          {[1, 1, 1, 1].map(item => {
            return (
              <Image
                source={require('../src/Avatar.png')}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 32 / 2,
                  marginRight: -10,
                }}
              />
            );
          })}
          <View style={{marginHorizontal: 20, width: '65%'}}>
            <Text style={[styles.heading14, {fontSize: 12}]}>
              {callAnotherPerson(data?.room_detail, 0)}
              {', '}
              {callAnotherPerson(data?.room_detail, 1)} dan{' '}
              {data.room_detail?.length} Orang lainnya telah bergabung dalam
              room ini
              {/* Rudiantara, Yono, dan 5 Orang lainnya telah bergabung dalam room
              ini */}
            </Text>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Text style={styles.small12}>Lihat semua pemain</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.subContainer3}>
          <Text style={[styles.heading14, {fontSize: 14}]}>Deskripsi</Text>
          <Text style={[styles.heading14, {fontWeight: '400'}]}>
            {data?.room_desc}
          </Text>
        </View>
        <View style={[styles.subContainer3, {paddingVertical: 10}]}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Text style={[styles.heading14, {fontSize: 20, marginBottom: 0}]}>
              Biaya Pemain
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => handlePlayer('minus')}
                disabled={totalPlayer == 1 ? true : false}>
                <Image
                  source={require('../src/MinusWhite.png')}
                  style={{
                    height: 32,
                    width: 32,
                    marginLeft: 28,
                    marginRight: 30,
                  }}
                />
              </TouchableOpacity>
              <Text style={[styles.heading14, {marginBottom: 0}]}>
                {totalPlayer}
              </Text>
              <TouchableOpacity onPress={() => handlePlayer('plus')}>
                <Image
                  source={require('../src/PlusWhite.png')}
                  style={{height: 32, width: 32, marginLeft: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.small12,
                {fontSize: 20, fontWeight: '700', height: 50},
              ]}>
              Rp{' '}
              {currency(
                priceperPerson(data?.booking?.total, data?.max_capacity) *
                  parseInt(totalPlayer),
              )}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer3}>
          <Text style={[styles.heading14, {fontSize: 14, paddingBottom: 8}]}>
            Komentar
          </Text>
          <View style={{paddingVertical: 8}}>
            <Text style={[styles.heading14, {fontSize: 14}]}>
              Doni Chrisdianto
            </Text>
            <Text style={[styles.heading14, {fontWeight: '400'}]}>
              Mantapp !! dapet temen baru
            </Text>
          </View>
          <View style={{paddingVertical: 8}}>
            <Text style={[styles.heading14, {fontSize: 14}]}>
              Doni Chrisdianto
            </Text>
            <Text style={[styles.heading14, {fontWeight: '400'}]}>
              Mantapp !! dapet temen baru
            </Text>
          </View>
          <View style={{marginTop: 8, flexDirection: 'row'}}>
            <TextInput
              style={{
                width: '75%',
                height: 40,
                backgroundColor: '#7c7c7c',
                borderRadius: 16,
                borderTopEndRadius: 16,
                borderTopStartRadius: 16,
              }}
              placeholder="Masukkan Komentar Kamu"
              placeholderTextColor={'#FFFFFF'}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#000000',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#C4f601',
                marginLeft: 12,
                width: '20%',
              }}>
              <Text style={{color: '#C4F601'}}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            bottom: 0,
            backgroundColor: '#000',
            height: 70,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              width: '90%',
              marginBottom: 10,
              height: 38,
              backgroundColor: '#C4F601',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Text
              style={[
                styles.heading14,
                {color: '#000000', fontSize: 14, marginBottom: 0},
              ]}>
              Mulai Meetup
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isVisible}
          style={{justifyContent: 'flex-end', margin: 0}}
          animationInTiming={900}
          animationOutTiming={500}
          swipeDirection={'down'}
          backdropOpacity={0.1}
          propagateSwipe={true}
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
            <Text
              style={[
                styles.heading14,
                {fontSize: 20, alignSelf: 'flex-start'},
              ]}>
              Daftar Pemain yang Bergabung
            </Text>
            <ScrollView>
              <Pressable>
                {data?.room_detail
                  ? data?.room_detail?.map((item, idx) => {
                      return (
                        <View
                          key={idx}
                          style={{
                            marginTop: 20,
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              maxWidth: '55%',
                              width: '100%',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../src/Avatar.png')}
                              style={{width: 32, height: 32, marginRight: 16}}
                            />
                            <Text style={styles.heading14}>
                              {item?.user?.username}
                            </Text>
                          </View>

                          <TouchableOpacity
                            style={{
                              backgroundColor: '#C4f601',
                              borderRadius: 16,
                              width: 98,
                              height: 32,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '700',
                                color: '#161616',
                              }}>
                              Keluarkan
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  : ''}
              </Pressable>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  subContainer: {
    paddingHorizontal: 16,
    paddingTop: 23.5,
    paddingBottom: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#000000',
    paddingBottom: 23.5,
  },
  subContainer2: {
    paddingVertical: 18,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: '#000000',
  },
  heading14: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
    fontFamily: 'OpenSans',
    marginBottom: 8,
  },
  small12: {
    fontSize: 12,
    color: '#C4F601',
    fontWeight: '400',
    fontFamily: 'OpenSans',
    marginBottom: 8,
  },
  subContainer3: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginTop: 8,
    borderRadius: 16,
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
});

//make this component available to the app
export default DetailMeetupPage;