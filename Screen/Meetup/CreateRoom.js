//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {currency, Axios} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Fontisto';
import {showMessage, hideMessage} from 'react-native-flash-message';

const CreateRoom = ({route, navigation: {goBack, navigate}}) => {
  const [totalPlayer, setTotalPlayer] = useState(2);
  const [deskripsi, setDeskripsi] = useState('');
  const [data, setData] = useState({});
  const [title, setTitle] = useState(null);
  const [male, setMale] = useState('');
  const [female, setFemale] = useState('');
  const [fromAge, setFromAge] = useState(null);
  const [toAge, setToAge] = useState(null);
  const [dataUser, setDataUser] = useState({});
  const [listTime, setListTime] = useState([]);
  const idFacility = route.params.idFacility;
  const merchantId = route.params.merchantId;
  const img = route.params.img;
  const selectedDate = route.params.selectedDate;
  const subTotal = route.params.subTotal;
  const price = route.params.price;
  const [isVisible, setIsVisible] = useState(false);
  const [dataReserve, setDataReserve] = useState({});

  const dataUserAsync = async () => {
    await AsyncStorage.getItem('dataUser').then(res => {
      if (res) {
        const userId = JSON.parse(res)?.id;
        console.log(userId);
        getUser(userId);
      }
    });
  };

  const handleTotalPlayer = type => {
    switch (type) {
      case 'minus':
        setTotalPlayer(totalPlayer === 2 ? 2 : totalPlayer - 1);
        break;
      case 'plus':
        setTotalPlayer(totalPlayer + 1);
        break;
      default:
        break;
    }
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
  const getDetailMerchant = async () => {
    const response = await Axios.get(`/merchant/${merchantId}`);
    const data = response.data?.data;
    setData(data || '');
  };
  useEffect(() => {
    getDetailMerchant();
    dataUserAsync();
    setListTime(route.params.listTime);
  }, []);

  const sortTime = () => {
    const result = listTime?.sort((a, b) => {
      return b.time > a.time;
    });

    return result || [];
  };

  const handleBooking = async () => {
    if (listTime[0]?.time) {
      const body = {
        facilityId: idFacility,
        total: subTotal,
        price,
        booking_date: moment(selectedDate).format('YYYY-MM-DD'),
        userId: dataUser?.id,
        time: JSON.stringify(listTime.map(item => item.time)),
        type: 'meetup',
      };
      const max = Math.max(
        ...listTime
          .map(item => item.time)
          .map(time => {
            const [hours, minutes] = time.split(':');
            return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
          }),
      );
      const maxTime = `${Math.floor(max / 60)
        .toString()
        .padStart(2, '0')}:${(max % 60).toString().padStart(2, '0')}`;

      const newBookingDate = `${moment(selectedDate).format(
        'YYYY-MM-DD',
      )} ${maxTime}`;

      await Axios.post('/booking', body)
        .then(res => {
          const response = res.data?.data;
          const id = response.id;
          if (res.data.message === 'OK') {
            handleCreateRoom(id, newBookingDate);
          }
        })
        .catch(err => {
          console.log({err: err.response});
        });
    }
  };
  const getDetailFacility = async () => {
    const response = await Axios.get(`/facility/merchant/detail/${idFacility}`);
    const data = response.data?.data;
    console.log(data);
    setDataReserve(data);
  };
  const DpSubtotal = () => {
    const dp =
      parseInt(subTotal) * 0.2 + parseInt(subTotal) / parseInt(totalPlayer);
    return dp;
  };

  const handleCreateRoom = (idBooking, room_expired) => {
    const body = {
      room_name: title,
      facilityId: idFacility,
      gender: JSON.stringify([male ? 'male' : null, female ? 'female' : null]),
      range_age: JSON.stringify([fromAge, toAge]),
      max_capacity: totalPlayer,
      room_desc: deskripsi,
      hostId: dataUser?.id,
      bookingId: idBooking,
      payment: DpSubtotal(),
      room_expired: room_expired,
    };
    Axios.post('/room', body)
      .then(async res => {
        const data = res.data;
        if (data.message === 'OK') {
          navigate('Tabs');
        }
      })
      .catch(err => {
        console.log('error create room', err);
      });
  };

  const btnBuatRoom = async () => {
    switch (title && fromAge && toAge) {
      case null:
        showingMessage(
          `Please Input ${
            !title ? 'Title' : !fromAge ? 'Umur Mulai' : !toAge ? 'Umur Ke' : ''
          }`,
        );
        break;

      default:
        await handleBooking();
        break;
    }
  };

  const showingMessage = message => {
    showMessage({
      message: message,
      type: 'danger',
    });
  };

  const handleMinimumAge = text => {
    const age = text.replace(/[^0-9]/g, '');

    if (age !== '') {
      const numericAge = parseInt(age);
      if (numericAge < 0 || numericAge > 99) {
        return;
      }
    }
    setToAge(age);
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
          Buat Room Meetup
        </Text>
      </View>
      <View>
        <Image source={{uri: img}} style={{width: '100%', height: 188}} />
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#000000',
            paddingBottom: 22,
            paddingTop: 19,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginVertical: 8,
            }}>
            <Ionicon
              name="location-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff', marginRight: 20}}
            />
            <View>
              <Text style={styles.heading28}>{data?.address}</Text>
              {/* <Text style={styles.heading28}>Badminton</Text> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              marginTop: 18,
            }}>
            <Ionicon
              name="time-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff', marginRight: 20}}
            />
            <Text style={styles.heading28}>
              {moment(selectedDate).format('ddd, DD MMM YYYY')} ,{' '}
              {sortTime()[0]?.time} - {sortTime()[sortTime()?.length - 1]?.time}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              alignItems: 'center',
              marginTop: 18,
            }}>
            <Ionicon
              name="pricetag-outline"
              size={18}
              style={{fontWeight: 'bold', color: '#ffffff', marginRight: 20}}
            />
            <Text style={styles.heading28}>Rp. {currency(subTotal)}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <Text style={[styles.heading28, {fontSize: 20}]}>
            Judul Room Meetup
          </Text>

          <TextInput
            placeholder="Masukkan Judul Meetup"
            style={styles.TextInput}
            value={title}
            placeholderTextColor={'#FFFFFF'}
            onChangeText={text => setTitle(text)}
          />
          <View style={{marginTop: 32}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>
              Jenis Kelamin
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                status={male ? 'checked' : 'unchecked'}
                onPress={() => setMale(!male)}
                color="white"
              />
              <Text
                style={[styles.heading14, {marginLeft: 18}]}
                onPress={() => setMale(!male)}>
                Laki-laki
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                status={female ? 'checked' : 'unchecked'}
                onPress={() => setFemale(!female)}
                color="white"
              />
              <Text
                style={[styles.heading14, {marginLeft: 18}]}
                onPress={() => setFemale(!female)}>
                Perempuan
              </Text>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>
              Hanya dengan Umur
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 22,
                alignItems: 'center',
              }}>
              <Text style={[styles.heading28, {fontSize: 16, width: '20%'}]}>
                Mulai
              </Text>
              <TextInput
                style={[styles.TextInput, {marginTop: 0}]}
                value={fromAge}
                maxLength={2}
                onChangeText={e => setFromAge(e)}
                keyboardType="number-pad"
              />
              {fromAge < 19 && fromAge != null ? (
                <Text
                  style={[
                    styles.heading28,
                    {
                      fontSize: 16,
                      width: '40%',
                      paddingLeft: 10,
                      color: '#DC3545',
                    },
                  ]}>
                  Batas umur 18 Tahun
                </Text>
              ) : null}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <Text style={[styles.heading28, {fontSize: 16, width: '20%'}]}>
                Sampai
              </Text>
              <TextInput
                style={[styles.TextInput, {marginTop: 0}]}
                value={toAge}
                maxLength={2}
                keyboardType="number-pad"
                onChangeText={handleMinimumAge}
              />

              {/* <Dropdown dropdownPosition={true} data={age} /> */}
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>
              Jumlah Pemain Meetup
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <TouchableOpacity onPress={() => handleTotalPlayer('minus')}>
                <Image
                  source={require('../../src/MinusWhite.png')}
                  style={{
                    height: 32,
                    width: 32,
                    marginRight: 30,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.heading14}>{totalPlayer}</Text>
              <TouchableOpacity onPress={() => handleTotalPlayer('plus')}>
                <Image
                  source={require('../../src/PlusWhite.png')}
                  style={{height: 32, width: 32, marginLeft: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginTop: 38}}>
            <Text style={[styles.heading28, {fontSize: 20}]}>Deskripsi</Text>
            <TextInput
              placeholder="Masukkan deskripsi"
              placeholderTextColor={'#FFFFFF'}
              editable
              value={deskripsi}
              multiline={true}
              onChangeText={text => {
                setDeskripsi(text);
              }}
              style={styles.TextInput}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: '#000000',
              marginBottom: 30,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#C4F601',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                height: 38,
              }}
              disabled={fromAge < 19 && fromAge != null ? true : false}
              onPress={() => {
                setIsVisible(true), getDetailFacility();
              }}>
              <Text style={[styles.heading28, {color: '#000000'}]}>
                Buat Room
              </Text>
            </TouchableOpacity>
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
          <View View style={styles.Modal}>
            <View
              style={{
                backgroundColor: '#7C7C7C',
                width: 55,
                height: 3,
                marginBottom: 24,
                marginTop: 30,
              }}
            />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={{width: '85%', justifyContent: 'flex-start'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <Ionicon
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                    name="location-outline"
                  />
                  <View>
                    <Text
                      style={[
                        styles.heading28,
                        {marginBottom: 8, fontSize: 16},
                      ]}>
                      {data?.address}
                    </Text>
                    <Text
                      style={[
                        styles.heading28,
                        {marginBottom: 8, fontSize: 14},
                      ]}>
                      {dataReserve?.facility_info?.facility_name}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Ionicon
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                    name="time-outline"
                  />
                  <Text
                    style={[styles.heading28, {marginBottom: 8, fontSize: 16}]}>
                    {moment(selectedDate).format('ddd, DD MMM YYYY')} ,{' '}
                    {sortTime()[0]?.time} -{' '}
                    {sortTime()[sortTime()?.length - 1]?.time}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Ionicon
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                    name="pricetag-outline"
                  />
                  <Text
                    style={[
                      styles.heading28,
                      {color: '#C4f601', fontSize: 16},
                    ]}>
                    Rp. {currency(DpSubtotal())}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: '#7c7c7c',
                    borderWidth: 1,
                    padding: 15,
                    justifyContent: 'center',
                    marginTop: 32,
                    alignItems: 'center',
                  }}>
                  <View style={{width: '15%'}}>
                    <Icon
                      style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                        paddingHorizontal: 10,
                      }}
                      name="wallet"
                    />
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={[styles.heading28, {fontSize: 16}]}>
                      Dompet Olahragamu
                    </Text>
                  </View>
                  <View style={{width: '30%'}}>
                    <Text
                      style={[
                        styles.heading28,
                        {color: '#C4f601', fontSize: 14},
                      ]}>
                      Rp. {currency(dataUser?.balance)}
                    </Text>
                  </View>
                </View>
                {parseInt(dataUser?.balance) > parseInt(DpSubtotal()) ? (
                  false
                ) : true ? (
                  <View style={{marginBottom: 5}}>
                    <Text
                      style={[
                        styles.heading28,
                        {color: '#F47878', fontSize: 14},
                      ]}>
                      Saldo Dompet Olahragamu tidak mencukupi
                    </Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 38,
                    backgroundColor: '#C4F601',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 15,
                  }}
                  disabled={
                    parseInt(dataUser?.balance) > parseInt(DpSubtotal())
                      ? false
                      : true
                  }
                  onPress={btnBuatRoom}>
                  <Text
                    style={[
                      styles.heading14,
                      {fontWeight: '700', fontSize: 14, color: '#000000'},
                    ]}>
                    Bayar Sekarang
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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

  heading14: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
  header: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: 'white',
  },
  heading28: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'OpenSans',
    color: '#FFFFFF',
  },
  Modal: {
    backgroundColor: '#161616',
    borderRadius: 10,
    height: '50%',
    width: '100%',
    alignItems: 'center',
  },
  TextInput: {
    justifyContent: 'center',
    borderRadius: 16,
    height: 60,
    marginTop: 19,
    backgroundColor: '#7C7C7C',
    color: '#ffffff',
    paddingHorizontal: 16,
  },
});

//make this component available to the app
export default CreateRoom;
