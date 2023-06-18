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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const DetailMeetupPage = ({route, navigation: {navigate, goBack}}) => {
  const [totalPlayer, setTotalPlayer] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const id = route.params?.id;
  const [data, setData] = useState({});
  const [dataUser, setDataUser] = useState({});
  const navigation = useNavigation();

  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      const userId = JSON.parse(res)?.id;
      getDetailRoom(userId);
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
  const handlePlayer = type => {
    switch (type) {
      case 'minus':
        setTotalPlayer(totalPlayer === 1 ? 1 : totalPlayer - 1);
        break;
      case 'plus':
        const maxCapacity = parseInt(data?.max_capacity);
        const currentPlayers = parseInt(data.room_detail?.length);
        const remainingSlots = maxCapacity - currentPlayers;

        if (remainingSlots > 0 && totalPlayer < remainingSlots) {
          setTotalPlayer(totalPlayer + 1);
        }
        break;
      default:
        break;
    }
  };

  const handleJoin = async () => {
    try {
      const body = {
        userId: dataUser?.id,
        roomId: id,
        qty: totalPlayer,
        payment: priceperPerson(data?.booking?.total, data?.max_capacity),
      };
      await Axios.post('/room/join', body)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailRoom = async userId => {
    try {
      if (!id) {
        showMessage({
          message: 'Tidak ada Meetup',
          type: 'danger',
        });
      } else {
        const {data} = await Axios.get(`/room/${id}?user_id=${userId}`);
        if (data.message === 'OK') {
          console.log('datanya', data.data);
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

  const isHost = () => {
    const userId = dataUser?.id;
    const result = data?.hostId === userId ? true : false;
    return result;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dataUserAsync();
    });
    return unsubscribe;
  }, [navigation]);

  const handleCancelJoin = async () => {
    const body = {
      userId: dataUser?.id,
      roomId: id,
      isHost: isHost(),
      bookingId: data?.bookingId,
    };

    await Axios.post('/room/cancel', body)
      .then(res => {
        console.log({res});
        navigate('Tabs');
      })
      .catch(err => {
        console.log({err});
      });
    console.log({body});
  };

  const handleStartMeet = async () => {
    const body = {
      roomId: id,
      userId: dataUser?.id,
    };
    await Axios.post('/room/start', body)
      .then(res => {
        const result = res.data;

        if (result.message == 'OK') {
          navigate('Tabs');
        }
      })
      .catch(err => {
        console.log({err: err.message});
      });
  };

  const handleShowJoinModal = () => {
    setShowJoin(true);
    handleJoin();
  };
  const handleHideJoinModal = () => {
    setShowJoin(false);
    navigate('Tabs');
  };

  const validatingBalance = () => {
    const validate =
      priceperPerson(data?.booking?.total, data?.max_capacity) *
        parseInt(totalPlayer) >
      parseInt(dataUser?.balance);
    return validate;
  };

  const TimePlay = () => {
    const bookingTime = data?.booking?.time;

    let displayTime = '';

    if (bookingTime) {
      try {
        const parsedTime = JSON.parse(bookingTime);

        if (Array.isArray(parsedTime) && parsedTime.length === 1) {
          const time = parsedTime[0];
          const [startHour, startMinute] = time.split(':');

          if (startHour && startMinute) {
            displayTime = `${startHour.padStart(2, '0')}:${startMinute.padStart(
              2,
              '0',
            )} - ${startHour.padStart(2, '0')}:59`;
          }
        } else if (Array.isArray(parsedTime) && parsedTime.length === 2) {
          const startTime = parsedTime[0];
          const endTime = parsedTime[1];

          displayTime = `${startTime} - ${endTime}`;
        }
      } catch (error) {
        console.log('Invalid booking time format');
      }
    }

    console.log(displayTime);
    return displayTime;
  };

  const displayGender = () => {
    if (data && typeof data.gender === 'string') {
      const parsedGender = JSON.parse(data.gender);
      if (parsedGender[0] === 'male') {
        return 'Laki - Laki';
      } else if (parsedGender[0] === 'female') {
        return 'Perempuan';
      } else {
        return 'Laki - Laki & Perempuan';
      }
    } else {
      console.log('Invalid data');
    }
  };

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
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flexDirection: 'row', width: '40%'}}>
              <Text style={styles.heading14}>
                {data?.facility?.category?.category_name || '-'}
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  color: '#D9D9D9',
                  marginHorizontal: 12,
                }}>
                |
              </Text>
              <Text style={[styles.heading14, {fontWeight: '400'}]}>
                {data?.gender
                  ? JSON.parse(data?.gender)[0] == 'male'
                    ? 'Laki- Laki'
                    : JSON.parse(data?.gender)[1] == 'female'
                    ? 'Perempuan'
                    : 'Laki - Laki & Perempuan'
                  : data?.gender}
              </Text>
              <Text
                style={[
                  styles.heading14,
                  {fontWeight: '400', marginHorizontal: 8},
                ]}>
                {data?.range_age
                  ? `(${JSON.parse(data?.range_age)[0]}-${
                      JSON.parse(data?.range_age)[1]
                    }th)`
                  : data?.range_age}
              </Text>
              {isHost() || data?.isJoin ? (
                <View style={{width: '50%', marginLeft: 8}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#000000',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#C4f601',
                      height: '100%',
                      width: '75%',
                    }}
                    onPress={() => setShowCancel(true)}>
                    <Text style={{color: '#C4F601', fontWeight: '700'}}>
                      Batal
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <TouchableOpacity>
                <Ionicon
                  name="share-social-outline"
                  size={24}
                  style={{
                    fontWeight: 'bold',
                    color: '#ffffff',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              display: 'flex',
            }}>
            <Ionicon
              name="person"
              size={15}
              style={{
                fontWeight: 'bold',
                color: '#ffffff',
                paddingRight: 10,
              }}
            />
            <Text
              style={[styles.heading14, {fontWeight: '700', marginBottom: 0}]}>
              {data?.user?.username}
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
                {TimePlay()}
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
          {data?.room_detail?.slice(0, 4).map(item => {
            return (
              <Image
                source={{
                  uri: item.user?.profile_img
                    ? item.user?.profile_img
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                }}
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
              {/* {callAnotherPerson(data?.room_detail, 0)}
              {', '}
              { */}
              {data.room_detail?.length === 1
                ? 'belum ada orang yang bergabung dalam room ini'
                : `${callAnotherPerson(data?.room_detail, 1)} dan ${
                    data.room_detail?.length - 1
                  } Orang lainnya telah bergabung dalam room ini`}
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
            {isHost() ||
            data?.room_detail?.filter(filter => filter?.userId == dataUser?.id)
              ?.length > 0 ? null : (
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
            )}
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
        {/* <View style={styles.subContainer3}>
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
                bottom: 0,
                backgroundColor: '#000',
                height: 70,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{color: '#C4F601'}}>POST</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        {data?.isJoin && data?.status_room === 'playing' ? (
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
              disabled={true}
              onPress={handleStartMeet}>
              <Text
                style={[
                  styles.heading14,
                  {color: '#000000', fontSize: 14, marginBottom: 0},
                ]}>
                Sudah Mulai Meetup
              </Text>
            </TouchableOpacity>
          </View>
        ) : data?.isJoin && data?.status_room === 'waiting' ? (
          isHost() ? (
            parseInt(data.max_capacity) - parseInt(data.room_detail?.length) !=
            0 ? null : (
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
                  onPress={handleStartMeet}>
                  <Text
                    style={[
                      styles.heading14,
                      {color: '#000000', fontSize: 14, marginBottom: 0},
                    ]}>
                    Mulai Meetup
                  </Text>
                </TouchableOpacity>
              </View>
            )
          ) : null
        ) : (
          <View
            style={{
              bottom: 0,
              backgroundColor: '#000',
              height: 70,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
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
              disabled={
                priceperPerson(data?.booking?.total, data?.max_capacity) *
                  parseInt(totalPlayer) >
                parseInt(dataUser?.balance)
                  ? true
                  : false
              }
              onPress={() => handleShowJoinModal()}>
              <Text
                style={[
                  styles.heading14,
                  {color: '#000000', fontSize: 14, marginBottom: 0},
                ]}>
                Join Meetup
              </Text>
            </TouchableOpacity>
            {console.log(validatingBalance())}
            {validatingBalance() ? (
              <Text
                style={[
                  styles.heading28,
                  {color: '#F47878', fontSize: 14, fontWeight: '700'},
                ]}>
                Dompet anda tidak Cukup
              </Text>
            ) : null}
          </View>
        )}
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
                              source={{
                                uri: item.user?.profile_img
                                  ? item.user?.profile_img
                                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                              }}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 32 / 2,
                                marginRight: 16,
                              }}
                            />
                            <Text style={styles.heading14}>
                              {item?.user?.username}
                            </Text>
                          </View>

                          {/* {isHost() && item?.userId != dataUser?.id ? (
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
                          ) : null} */}
                        </View>
                      );
                    })
                  : ''}
              </Pressable>
            </ScrollView>
          </View>
        </Modal>
        <Modal
          style={{justifyContent: 'center', alignItems: 'center'}}
          isVisible={showCancel}
          backdropOpacity={0}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          onBackdropPress={() => setShowCancel(false)}
          backdropTransitionOutTiming={600}>
          <View style={styles.Modal2}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                top: 5,
                right: 5,
              }}
              onPress={() => setShowCancel(false)}>
              <Text
                style={[styles.heading14, {textAlign: 'center', fontSize: 20}]}>
                X
              </Text>
            </TouchableOpacity>
            <Text style={[styles.heading14, {textAlign: 'center'}]}>
              Kamu Yakin ingin membatalkan meetup?
            </Text>
            <Text
              style={[
                styles.heading14,
                {textAlign: 'center', fontWeight: '400'},
              ]}>
              *membatalkan meetup akan menghanguskan biaya muka
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#C4F601',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#C4f601',
                height: '25%',
                width: '100%',
                marginTop: 6,
              }}
              onPress={() => handleCancelJoin()}>
              <Text
                style={[
                  styles.heading14,
                  {
                    textAlign: 'center',
                    fontWeight: '700',
                    color: '#000000',
                    marginBottom: 0,
                  },
                ]}>
                Iya, Batalkan Meetup
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          style={{justifyContent: 'center', alignItems: 'center'}}
          isVisible={showJoin}
          backdropOpacity={0}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          onBackdropPress={() => setShowJoin(false)}
          backdropTransitionOutTiming={600}>
          <View style={styles.Modal2}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                top: 5,
                right: 5,
              }}
              onPress={() => setShowJoin(false)}>
              <Text
                style={[styles.heading14, {textAlign: 'center', fontSize: 20}]}>
                X
              </Text>
            </TouchableOpacity>
            <Text style={[styles.heading14, {textAlign: 'center'}]}>
              Permintaan Join sudah dikirimkan
            </Text>
            <Text
              style={[
                styles.heading14,
                {textAlign: 'center', fontWeight: '400'},
              ]}>
              Persetujuan dari host akan dapat dilihat dalam halaman
              pemberitahuan
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#C4F601',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#C4f601',
                height: '25%',
                width: '100%',
                marginTop: 6,
              }}
              onPress={() => handleHideJoinModal()}>
              <Text
                style={[
                  styles.heading14,
                  {
                    textAlign: 'center',
                    fontWeight: '700',
                    color: '#000000',
                    marginBottom: 0,
                  },
                ]}>
                Ok, Baiklah
              </Text>
            </TouchableOpacity>
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
  Modal2: {
    backgroundColor: '#7C7C7C',
    borderRadius: 16,
    height: '25%',
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});

//make this component available to the app
export default DetailMeetupPage;
